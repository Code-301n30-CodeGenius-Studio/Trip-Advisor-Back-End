const axios = require('axios');

async function getWeather(latitude, longitude) {
  try {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?days=5&lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}&units=I`;

    // console.log('Request URL:', url);
    const response = await axios.get(url);

    const weatherData = response.data.data.map(day => new Weather(day));
    return weatherData;

  } catch(error) {
    console.error(`Error getting weather data: ${error}`);
    throw error;
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.valid_date;
    this.temperature = day.temp;
  }
}

module.exports = getWeather;
