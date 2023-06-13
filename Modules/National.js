const axios = require('axios');

async function getNational(query) {
  try {
    const url = `https://developer.nps.gov/api/v1/parks?limit=3&&api_key=${process.env.NATIONAL_API_KEY}&q=${query}`;
    const response = await axios.get(url);
    // return response.data;
    const nationalData = response.data.data.map(park => new National(park));
    // console.log(nationalData);
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
    this.workHours = park.operatingHours[0].standardHours;
    // this.exceptions = park.operatingHours;
    this.directions = park.directionsUrl;
    // this.entranceFee = park.entranceFees.cost;
  }
}
module.exports = getNational;
