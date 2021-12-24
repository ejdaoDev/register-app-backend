const User = require('./Security/User');
const IdType = require('./Security/IdType');
const Role = require('./Security/Role');
const Country = require('./Security/Country');
const Area = require('./Security/Area');

IdType.hasMany(User, {as: "users", foreignKey: "idtypeId"});
Role.hasMany(User, { as: "users", foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });
Country.hasMany(User, { as: "users", foreignKey: "countryId" });
Area.hasMany(User, { as: "users", foreignKey: "areaId" });
User.hasMany(User, { as: "createdBy", foreignKey: "createdById" });
User.hasMany(User, { as: "updatedBy", foreignKey: "updatedById" });
