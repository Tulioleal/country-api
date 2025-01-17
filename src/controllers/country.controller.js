class CountryController {
  async getCountry(req, res) {
      const countryCode = req.params.countryCode;

      if (!countryCode) {
        return res.status(400).json({ error: "countryCode is required" });
      }
      
      try {
        // Fetch country info
        const countryResponse = await fetch(`${process.env.DATE_NAGGER_ROUTE}/CountryInfo/${countryCode}`);
        const country = await countryResponse.json();

        // Fetch population and flag
        const populationPromise = fetch(`${process.env.COUNTRIES_NOW}/countries/population`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                country: country.commonName
            })
        });

        const flagPromise = fetch(`${process.env.COUNTRIES_NOW}/countries/flag/images`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                iso2: countryCode
            })
        });

        // Wait for both promises to resolve
        const [population, flag] = await Promise.all([populationPromise, flagPromise])
            .then(responses => Promise.all(responses.map(response => response.json())));

        res.json({
            name: country.commonName,
            borderCountries: country.borders,
            populationByYear: population.data.populationCounts,
            flag: flag.data.flag
        });
    } catch (error) {
        res.status(500).json({ errorMessage: "An error occurred while fetching country data", error });
    }
  }
}

module.exports = { CountryController };