const express = require("express");
const { setCountriesRoutes } = require("./routes/countries");
const {
  PORT
} = require("./const");

const app = express();
app.use(express.json());

setCountriesRoutes(app);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});