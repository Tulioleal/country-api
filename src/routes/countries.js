const { CountriesController } = require('../controllers/countries.controller');

function setCountriesRoutes(app) {
  const countriesController = new CountriesController();

  app.get('/countries', (request, response) =>
    countriesController.getCountries(request, response));
}

module.exports = { setCountriesRoutes };