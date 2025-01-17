class CountriesController {
    async getCountries(_req, res) {
        const countriesResponse = await fetch(
            process.env.DATE_NAGGER_ROUTE + '/AvailableCountries'
        )
        const countries = await countriesResponse.json()

        res.json(countries)
    }
}

module.exports = { CountriesController }
