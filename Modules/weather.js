const axios = require('axios');

async function getWeatherAndAirQuality(latitude, longitude) {
  try {
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?days=5&lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}`;
    const airQualityUrl = `https://api.weatherbit.io/v2.0/current/airquality?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}`;

    const weatherResponse = await axios.get(weatherUrl);
    // const airQualityResponse = await axios.get(airQualityUrl);
    return weatherResponse.data;
    // const weatherData = weatherResponse.data.data.map(day => new Weather(day, airQualityResponse.data.data[0]));
    // return weatherData;
  } catch (error) {
    console.error(`Error getting weather or air quality data: ${error}`);
    throw error;
  }
}

class Weather {
  constructor(day, airQuality) {
    this.forecast = day.weather.description;
    this.time = day.valid_date;
    this.airQuality = airQuality.aqi;
  }
}


module.exports = getWeatherAndAirQuality;


