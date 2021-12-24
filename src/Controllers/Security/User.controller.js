import User from "../../Models/Security/User";
import * as UserRepository from "../../Repositories/Security/User.repository";

export const create = async (req, res) => {
  let idnumberExist = await User.findOne({ where: { idnumber: req.body.idnumber } });
  if (idnumberExist) {
    res.json({ status: "204", message: "this idnumber exist" });
  } else {
    let result = await UserRepository.createUser(req);
    if (result) {
      res.json({ status: "200", message: "user created successfully" });
    } else {
      res.json({ status: "204", message: "something went wrong" });
    }
  }
};

export const getAll = async (req, res) => {
  let result = await UserRepository.getUsers(req);
  res.json({ status: "200", data: { users: result } });
}

export const getOne = async (req, res) => {
  let result = await UserRepository.getUsers(req);
  if (!result) {
    res.json({ status: "204", data: { message: 'user not exist' } });
  } else {
    res.json({ status: "200", data: { user: result } });
  }
}

export const deleteOne = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ status: "200", data: { message: "user successfully delete" } });
}

export const update = async (req, res) => {
  let result = await UserRepository.updateUser(req);
  if (result) { res.json({ status: "200", data: { message: "user updated successfully" } }) } else {

    res.json({ status: "204", data: { message: "this email and/or idnumber exist" } });
  }
}
