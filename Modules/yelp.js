const axios = require('axios');

async function getYelp(term, location, lat, lon) {
  try {
    const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&term=${term}&sort_by=best_match&limit=20`;
    const headers = {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    };

    const response = await axios.get(url, { headers });
    // console.log(response.data);
    if (response.data.businesses.length > 0) {
      const reviewUrl = `https://api.yelp.com/v3/businesses/${response.data.businesses[0].id}/reviews?limit=20&sort_by=yelp_sort`;
      const reviewResponse = await axios.get(reviewUrl, { headers });
      const yelpData = reviewResponse.data.reviews.map(business => new Yelp(business));
      return yelpData;
    }
  } catch (error) {
    console.error(`Error getting Yelp data: ${error}`);
    throw error;
  }
}

class Yelp {
  constructor(business) {
    this.rating = business.rating;
    this.text = business.text;
    this.review_count = business.review_count;
  }
}

module.exports = getYelp;
