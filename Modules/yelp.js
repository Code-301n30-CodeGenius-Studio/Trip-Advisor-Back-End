const axios = require('axios');

async function getYelp(term, location) {
  try {
    const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`;
    const headers = {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    };

    const response = await axios.get(url, { headers });

    const yelpData = response.data.businesses.map(business => new Yelp(business));
    return yelpData;
  } catch (error) {
    console.error(`Error getting Yelp data: ${error}`);
    throw error;
  }
}

class Yelp {
  constructor(business) {
    this.name = business.name;
    this.review_count = business.review_count;
  }
}

module.exports = getYelp;
