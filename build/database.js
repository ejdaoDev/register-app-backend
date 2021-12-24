"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var _require2 = require('./config'),
    DATABASE = _require2.DATABASE;

var sequelize = new Sequelize(DATABASE.database, DATABASE.username, DATABASE.password, {
  host: DATABASE.host,
  dialect: "mysql"
});
module.exports = sequelize;