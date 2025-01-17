const { CountryController } = require('../controllers/country.controller');

function setCountryRoutes(app) {
  const countryController = new CountryController();

  app.get('/countries/:countryCode', (request, response) =>
    countryController.getCountry(request, response));
}

module.exports = { setCountryRoutes };