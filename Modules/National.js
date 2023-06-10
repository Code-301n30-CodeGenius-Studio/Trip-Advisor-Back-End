const axios = require('axios');

async function getNational(lat, lon) {
  try {
    const url = `https://developer.nps.gov/api/v1/parks?limit=3&lat=${lat}&lon=${lon}&api_key=${process.env.NATIONAL_API_KEY}`;

    const response = await axios.get(url);

    const nationalData = response.data.data.map(park => new National(park));
    return nationalData;
  } catch (error) {
    console.error(`Error getting National data: ${error}`);
    throw error;
  }
}

class National {
  constructor(park) {
    this.name = park.fullName;
    this.description = park.description;
    this.workHours = park.operatingHours;
    this.exceptions = park.operatingHours;
    this.directions = park.directionsUrl;
  }
}

module.exports = getNational;

