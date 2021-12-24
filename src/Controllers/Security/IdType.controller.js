const IdType = require("../../Models/Security/IdType");

export const getAllIdTypes = async (req, res) => {
  let IdTypes = await IdType.findAll();
  res.status(200).json({ type:"200", data: {IdTypes: IdTypes} });
};