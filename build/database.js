"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

require('dotenv').config({
  path: './.env'
});

var sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});
module.exports = sequelize;