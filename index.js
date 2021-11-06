/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require('./logger/logger');

const app = express();
global.__basedir = __dirname + "/.";
require('dotenv').config();

const environment = process.env.ENVIRONMENT;
let envPath = './environments/.env-dev';
if (environment === 'test') {
  envPath = './environments/.env-test';
} else if (environment === 'production') {
  envPath = './environments/.env-prod';
}
require('dotenv').config({ path: envPath });

const port = process.env.PORT || 3070;

console.log('environment::::::', process.env.ENVIRONMENT);
console.log('DB_CONNECTION_STR:::::::::::::', process.env.DB_CONNECTION_STR);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./public/models");
db.sequelize.sync();

require("./public/main/routes")(app);
require("./public/admin/routes")(app);
// require("./public/fileSystem/uploadImages")(app);

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Rakshak Code Service application." });
});

app.listen(port, (err) => {
  if (err) {
    logger.error('Error::', err);
  }
  logger.info(`running server on from port:::::::${port}`);
});
