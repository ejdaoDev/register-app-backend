import bcrypt from "bcryptjs";
import Role from "../../Models/Security/Role";
import IdType from "../../Models/Security/IdType";
import * as UserService from "../../Services/Security/UserService";
import CreateEmailService from "../../Services/Security/CreateEmailService";
import Country from "../../Models/Security/Country";
import User from "../../Models/Security/User";
const Sequelize = require("../../database");

export async function createUser(req) {
  let me = await UserService.getAuthId(req);
  try {
    let country = await Country.findOne({ where: { abbrev: req.body.country }, attributes: ['id'] });
    await Sequelize.transaction(async (t) => {
      await User.create(
        {
          idtypeId: req.body.idtype,
          roleId: req.body.role,
          countryId: country.id,
          areaId: req.body.area,
          idnumber: req.body.idnumber,
          firstname: req.body.firstname,
          secondname: req.body.secondname,
          firstlastname: req.body.firstlastname,
          secondlastname: req.body.secondlastname,
          email: await CreateEmailService(req),
          password: await bcrypt.hash("123", await bcrypt.genSalt(10)),
          username: null,
          createdById: me,
          updatedById: me,
          createdAt: req.body.createdAt,
        },
        { transaction: t }
      );
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateUser(req) {
  let me = await UserService.getAuthId(req);
  try {
    let country = await Country.findOne({ where: { abbrev: req.body.country }, attributes: ['id'] });
    await Sequelize.transaction(async (t) => {
      await User.update(
        {
          idtypeId: req.body.idtype,
          roleId: req.body.role,
          countryId: country.id,
          areaId: req.body.area,
          idnumber: req.body.idnumber,
          firstname: req.body.firstname,
          secondname: req.body.secondname,
          firstlastname: req.body.firstlastname,
          secondlastname: req.body.secondlastname,
          email: await CreateEmailService(req),
          updatedById: me
        }, {
        where: { id: req.params.id }
      },
        { transaction: t }
      );

    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getUsers(req) {
  if (req.params.id === undefined) {
    let me = await UserService.getAuthId(req);
    let Users = await User.findAll({
      include: [
        { model: Role, attributes: ['name'] },
        { model: IdType, attributes: ['abbrev'] }], where: { createdById: me },
      attributes: { exclude: ['password', 'username', 'reset_password'] }
    });
    return Users;
  } else {
    let UserToGet = await User.findOne({
      include: [
        { model: Role, attributes: ['name'] },
        { model: IdType, attributes: ['abbrev'] }], where: { id: req.params.id },
      attributes: { exclude: ['password', 'username', 'reset_password'] }
    });
    if (UserToGet) {
      return UserToGet;
    } else {
      return false;
    }
  }
}
