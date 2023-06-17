const axios = require('axios');

async function getYelp(term, location, lat, lon) {
  try {
    const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&term=${term}&sort_by=best_match&limit=20`;
    const headers = {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    };

    const response = await axios.get(url , { headers });
    const businesses = response.data.businesses;
    if (businesses && businesses.length > 0) {
      const reviewUrl = `https://api.yelp.com/v3/businesses/${businesses[0].id}/reviews?limit=20&sort_by=yelp_sort`;
      const reviewResponse = await axios.get(reviewUrl, { headers });

      if (reviewResponse.data.reviews && reviewResponse.data.reviews.length > 0) {
        // Transform Yelp reviews into Yelp class instances
        const yelpData = reviewResponse.data.reviews.map(business => new Yelp(business));
        return yelpData;
      } else {
        return [{ message: 'No Yelp reviews available for this business' }];
      }
    } else {
      console.log('No businesses found');
      return [{ message: 'No businesses found for the given parameters' }];
    }
  } catch (error) {
    console.error(`Error getting Yelp data: ${error}`);
    return [{ message: 'Error getting Yelp data' }];
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
