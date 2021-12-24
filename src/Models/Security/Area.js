const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database');

class Area extends Model { }
Area.init({
    name: { type: DataTypes.STRING(50), allowNull: true },

}, {
    sequelize,
    modelName: "area",
    timestamps: false
});

module.exports = Area;