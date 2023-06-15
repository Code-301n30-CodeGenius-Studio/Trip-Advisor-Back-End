const axios = require('axios');

async function getLocation(city) {
  try {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_API_KEY}&q=${city}&format=json`;
    console.log(url);
    let config = {headers:{'Referer': 'http://localhost:3001'}};

    const response = await axios.get(url,config);
    const locationData = response.data.map(location => new Location(location));

    return locationData;
  } catch (error) {
    console.error(`Error getting LocationIQ data: ${error}`);
    throw error;
  }
}

class Location {
  constructor(location) {
    this.place_id = location.place_id;
    this.display_name = location.display_name;
    this.lat = location.lat;
    this.lon = location.lon;
  }
}

module.exports = getLocation;
