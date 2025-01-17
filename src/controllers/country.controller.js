class CountryController {
  async getCountry(req, res) {
      const countryCode = req.params.countryCode;

    if (!countryCode) {
        return res.status(400).json({ error: "countryCode is required" });
    }

    let country, population, flag;

    // Fetch country info
    try {
        const countryResponse = await fetch(`${process.env.DATE_NAGGER_ROUTE}/CountryInfo/${countryCode}`);
        country = await countryResponse.json();
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching country info", details: error });
    }

    // Fetch population
    try {
        const populationResponse = await fetch(`${process.env.COUNTRIES_NOW}/countries/population`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                country: country.commonName
            })
        });
        population = await populationResponse.json();
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching population data", details: error });
    }

    // Fetch flag
    try {
        const flagResponse = await fetch(`${process.env.COUNTRIES_NOW}/countries/flag/images`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                iso2: countryCode
            })
        });
        flag = await flagResponse.json();
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching flag data", details: error });
    }

    // Respond with the combined data
    try {
        res.json({
            name: country ? country.commonName : "No name provided",
            borderCountries: country ? country.borders : [],
            populationByYear: population.data ? population.data.populationCounts : [],
            flag: flag.data ? flag.data.flag : null
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while processing the response", details: error });
    }
  }
}

module.exports = { CountryController };