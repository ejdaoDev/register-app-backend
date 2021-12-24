const User = require("../../Models/Security/User");
const { Op } = require("sequelize");
import IdType from "../../Models/Security/IdType";
import * as UserRepository from "../../Repositories/Security/UserRepository";
import * as UserService from "../../Services/Security/UserService";

export const getAllUsers = async (req, res) => {
  let me = await UserService.getUserLogged(req);
  let Users = await User.findAll({ include: [{
    model: UserRole,
    as: 'roles',
    attributes: ['roleId']
  }, {
    model: IdType,
    as: 'idtype'
  }], where: { createdBy: me.id } });
  res.status(200).json({ type:"200", data: {Users: Users} });
}

export const getUser = async (req, res) => {
  let UserEdit = await User.findOne({ include: [{
    model: UserRole,
    as: 'roles',
    attributes: ['roleId']
  }, {
    model: IdType,
    as: 'idtype'
  }], where: { id: req.params.id } });
  if(UserEdit) res.status(200).json({ type:"200", data: {User: UserEdit} });
}

export const deleteUser = async (req, res) => {
  await UserRole.destroy({where: { userId: req.params.id }});
  await User.destroy({ where: { id: req.params.id } });  
  res.status(200).json({ type:"200", data: {message: "usuario eliminado exitosamente"} });
}

export const editUser = async (req, res) => {
  let result = await UserRepository.update(req);
  if (result) res.status(200).json({ type:"200", data: {message: "usuario editado exitosamente"}  });
  if (!result) res.status(200).json({ type:"204", data: {message: "numero de identidad y/o email ya"}  });
}

export const create = async (req, res) => {
  let idnumberExist = await User.findOne({ where: { idnumber: req.body.numberid } });
  if (idnumberExist) res.status(200).json({ type:"204", message: "Este id existe" });
  let emailExist = await User.findOne({ where: { email: req.body.email } });
  if (emailExist) res.status(200).json({ type:"204", message: "este email existe" });
  let result = await UserRepository.create(req);
  if (result) res.status(200).json({ type:"200", message: "usuario creado satisfactoriamente" });
  if (!result) res.status(200).json({ type:"204", message: "usuario no pudo ser creado" });
};

export const register = async (req, res) => {
  let emailExist = await User.findOne({ where: { email: req.body.email } });
  if (emailExist) res.status(200).json({ type:"204", message: "este email existe" });
  let result = await UserRepository.register(req);
  if (result) res.status(200).json({ type:"200", message: "usuario creado satisfactoriamente" });
  if (!result) res.status(200).json({ type:"204", message: "usuario no pudo ser creado" });
};