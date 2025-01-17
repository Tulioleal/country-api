const {
  DATE_NAGGER_ROUTE
} = require("../const");

class CountriesController {
  async getCountries(_req, res) {
      const countriesResponse = await fetch( DATE_NAGGER_ROUTE + "/AvailableCountries");
      const countries = await countriesResponse.json();
      
      res.json(countries);
  }
}

module.exports = { CountriesController };