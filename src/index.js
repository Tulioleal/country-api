const express = require('express')
const { setCountriesRoutes, setCountryRoutes } = require('./routes')

const app = express()
app.use(express.json())

setCountriesRoutes(app)
setCountryRoutes(app)

app.listen(process.env.PORT, () => {
    console.log('Server Listening on PORT:', process.env.PORT)
})
