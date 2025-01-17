const express = require("express");
const { setCountriesRoutes, setCountryRoutes } = require("./routes");
const {
  PORT
} = require("./const");

const app = express();
app.use(express.json());

setCountriesRoutes(app);
setCountryRoutes(app);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});