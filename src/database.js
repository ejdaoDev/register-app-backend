const { Sequelize } = require('sequelize');
const { DATABASE } = require('./config');

const sequelize = new Sequelize(
    DATABASE.database,
    DATABASE.username,
    DATABASE.password, {
        host: DATABASE.host,
        dialect: "mysql"
    }
);

module.exports = sequelize;