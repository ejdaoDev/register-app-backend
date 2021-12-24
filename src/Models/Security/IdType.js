const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database');

class IdType extends Model { }
IdType.init({
    abbrev: { type: DataTypes.STRING(10), allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: true },

}, {
    sequelize,
    modelName: "idtype",
    timestamps: false
});

module.exports = IdType;