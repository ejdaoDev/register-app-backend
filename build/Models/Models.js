"use strict";

var User = require('./Security/User');

var Token = require('./Security/Token');

var IdType = require('./Security/IdType');

var Role = require('./Security/Role');

var UserRole = require('./Security/UserRole');

IdType.hasMany(User, {
  as: "users",
  foreignKey: "idtypeId"
});
User.hasMany(UserRole, {
  as: "users",
  foreignKey: "userId"
});
Role.hasMany(UserRole, {
  as: "roles",
  foreignKey: "roleId"
}); //Role.belongsToMany(User,  { through: "user_roles", timestamps: false })
//User.belongsToMany(Role,  { through: "user_roles", timestamps: false })