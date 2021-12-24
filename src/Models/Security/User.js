const { Model, DataTypes } = require("sequelize");
const sequelize = require('../../database');

class User extends Model {}
User.init(
  {

    idnumber: { type: DataTypes.STRING(20), unique: true, allowNull: true },
    firstname: { type: DataTypes.STRING(20), allowNull: true },
    secondname: { type: DataTypes.STRING(20), allowNull: true },
    firstlastname: { type: DataTypes.STRING(20), allowNull: true },
    secondlastname: { type: DataTypes.STRING(20), allowNull: true },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: true },
    username: { type: DataTypes.STRING(20), unique: true, allowNull: true },
    password: { type: DataTypes.STRING(255) },
    reset_password: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
  }
);

module.exports = User;
