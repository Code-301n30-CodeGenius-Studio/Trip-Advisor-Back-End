// "use strict";

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const verifyUser = require('./Modules/Authorize');
// const mongoose = require("mongoose");
// // const UserModel = require('./Model/User');
// const getWeatherAndAirQuality = require("./Modules/weather");
// const getYelp = require("./Modules/yelp");
// const getLocation = require("./Modules/locationIQ");
// const getNational = require("./Modules/national");
// const handleSearch = require("./Modules/handleSearch");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 3001;

// mongoose.connect(process.env.MONGODB_URL);

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => console.log("Mongoose is connected"));

// app.use(verifyUser);

// app.get("/users", handleSearch.getUsers);

// app.post("/users", handleSearch.postUsers);

// app.delete("/users/:id", handleSearch.deleteUsers);

// app.put("users/:id", handleSearch.updateUsers);

// app.get("/weather", (request, response) => {
//   const { lat, lon } = request.query;
//   getWeatherAndAirQuality(lat, lon)
//     .then((summaries) => response.status(200).send(summaries))
//     .catch((error) => {
//       console.error(error);
//       response
//         .status(500)
//         .send("Sorry, something went wrong! " + error.message);
//     });
// });

// app.get("/yelp", (request, response) => {
//   const { term, location, latitude, longitude } = request.query;
//   getYelp(term, location, latitude, longitude)
//     .then((reviews) => response.status(200).send(reviews))
//     .catch((error) => {
//       console.error(error);
//       response
//         .status(500)
//         .send("Sorry, something went wrong! " + error.message);
//     });
// });

// app.get("/national", (request, response) => {
//   const { query } = request.query;
//   getNational(query)
//     .then((parks) => response.status(200).send(parks))
//     .catch((error) => {
//       console.error(error);
//       response
//         .status(500)
//         .send("Sorry, something went wrong! " + error.message);
//     });
// });

// app.get("/locationIQ", (request, response) => {
//   const { city } = request.query;
//   getLocation(city)
//     .then((location) => response.status(200).send(location))
//     .catch((error) => {
//       console.error(error);
//       response
//         .status(500)
//         .send("Sorry, something went wrong! " + error.message);
//     });
// });

// app.get("/", (request, response) =>
//   response.status(200).send("Default route working")
// );
// // app.post('/users', (request, response) => {
// //   const newUser = new UserModel({
// //     name: request.body.name,
// //     email: request.body.email,
// //     parkName: request.body.parkName,
// //   });

// //   newUser.save()
// //     .then(user => response.status(200).send(user))
// //     .catch(error => {
// //       console.error(error);
// //       response.status(500).send('Sorry, something went wrong! ' + error.message);
// //     });
// // });

// // app.put('/users/:id', (request, response) => {
// //   UserModel.findByIdAndUpdate(request.params.id, request.body, { new: true })
// //     .then(user => response.status(200).send(user))
// //     .catch(error => {
// //       console.error(error);
// //       response.status(500).send('Sorry, something went wrong! ' + error.message);
// //     });

// // });
// // app.delete('/users/:id', (request, response) => {
// //   UserModel.findByIdAndRemove(request.params.id)
// //     .then(() => response.status(200).send('User removed.'))
// //     .catch(error => {
// //       console.error(error);
// //       response.status(500).send('Sorry, something went wrong! ' + error.message);
// //     });
// // });

// app.listen(PORT, () => console.log(`listening on ${PORT}`));
