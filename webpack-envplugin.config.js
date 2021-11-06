const path = require('path');
const webpack = require('webpack');

const environment = process.env.ENVIRONMENT;

console.log('environment:::::', environment);

const ENVIRONMENT_VARIABLES = {
  ENVIRONMENT: environment,
  PORT: '9000',
  GREETING_MESSAGE: environment.GREETING_MESSAGE,
  API_WORKS_MESSAGE: environment.API_WORKS_MESSAGE,
  DB_USERNAME: environment.DB_USERNAME,
  DB_PASSWORD: environment.DB_PASSWORD,
  DB_CONNECTION_STR: 'dev connection string',
};

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js',
  },
  target: 'node',
  plugins: [
    new webpack.EnvironmentPlugin(ENVIRONMENT_VARIABLES),
  ],
};
