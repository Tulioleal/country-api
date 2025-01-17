const { CountryController } = require('../controllers/country.controller');

function setCountryRoutes(app) {
  const countryController = new CountryController();

  app.get('/country/:countryCode', (request, response) =>
    countryController.getCountry(request, response));
}

module.exports = { setCountryRoutes };