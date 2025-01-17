const cors = require('cors');
const { CountryController } = require('../controllers/country.controller');

function setCountryRoutes(app) {
  const countryController = new CountryController();

  // Allow all origins (or specify allowed origins)
  app.use(cors());

  app.post('/countries', (request, response) =>
    countryController.getCountry(request, response));
}

module.exports = { setCountryRoutes };