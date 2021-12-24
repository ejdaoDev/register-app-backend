const Role = require("../../Models/Security/Role");

export const getAllRoles = async (req, res) => {
  let Roles = await Role.findAll();
  res.status(200).json({ type:"200", data: {Roles: Roles} });
};