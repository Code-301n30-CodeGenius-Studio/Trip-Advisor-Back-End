'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const app = express();
app.use(cors());

const getWeather = require('./Modules/weather');
const getYelp = require('./Modules/yelp');
const getLocation = require('./Modules/locationIQ');
const getNational = require('./Modules/National');

app.get('/weather',(request, response) => {
  const { lat, lon } = request.query;
  getWeather(lat,lon)
    .then(summaries => response.status(200).send(summaries))
    .catch(error => {
      console.error(error);
      response.status(500).send('Sorry, something went wrong! '+ error.message);
    });
});

app.get('/yelp', (request, response) => {
  const { term, location } = request.query;
  getYelp(term, location)
    .then(reviews => response.status(200).send(reviews))
    .catch(error => {
      console.error(error);
      response.status(500).send('Sorry, something went wrong! ' + error.message);
    });
});

app.get('/national', (request, response) => {
  const { lat, lon } = request.query;
  getNational(lat, lon)
    .then(parks => response.status(200).send(parks))
    .catch(error => {
      console.error(error);
      response.status(500).send('Sorry, something went wrong! ' + error.message);
    });
});

app.get('/locationIQ', (request, response) => {
  const { city } = request.query;
  getLocation(city)
    .then(location => response.status(200).send(location))
    .catch(error => {
      console.error(error);
      response.status(500).send('Sorry, something went wrong! ' + error.message);
    });
});

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose is connected'));

app.get('/', (request, response) => response.status(200).send('Default route working'));

app.listen(PORT, () => console.log(`listening on ${PORT}`));

