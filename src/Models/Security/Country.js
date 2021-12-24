const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database');

class Country extends Model { }
Country.init({
    abbrev: { type: DataTypes.STRING(10), allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: true },

}, {
    sequelize,
    modelName: "country",
    timestamps: false
});

module.exports = Country;