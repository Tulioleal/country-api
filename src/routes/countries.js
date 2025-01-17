const cors = require('cors')
const { CountriesController } = require('../controllers/countries.controller')

function setCountriesRoutes(app) {
    const countriesController = new CountriesController()

    // Allow all origins (or specify allowed origins)
    app.use(cors())

    app.get('/countries', cors(), (request, response) =>
        countriesController.getCountries(request, response)
    )
}

module.exports = { setCountriesRoutes }
