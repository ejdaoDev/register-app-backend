import bcrypt from "bcryptjs";
import Role from "../../Models/Security/Role";
import IdType from "../../Models/Security/IdType";
import * as UserService from "../../Services/Security/UserService";
import CreateEmailService from "../../Services/Security/CreateEmailService";
import Country from "../../Models/Security/Country";
import User from "../../Models/Security/User";
import Area from "../../Models/Security/Area";
const Sequelize = require("../../database");

export async function createUser(req) {
  let me = await UserService.getAuthId(req);
  try {
    let idtype = await IdType.findOne({ where: { abbrev: req.body.idtype }, attributes: ['id'] });
    let role = await Role.findOne({ where: { name: req.body.role }, attributes: ['id'] });
    let country = await Country.findOne({ where: { abbrev: req.body.country }, attributes: ['id'] });
    let area = await Area.findOne({ where: { name: req.body.area }, attributes: ['id'] });
    await Sequelize.transaction(async (t) => {
      await User.create(
        {
          idtypeId: idtype.id,
          roleId: role.id,
          countryId: country.id,
          areaId: area.id,
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
    let idtype = await IdType.findOne({ where: { abbrev: req.body.idtype }, attributes: ['id'] });
    let role = await Role.findOne({ where: { name: req.body.role }, attributes: ['id'] });
    let country = await Country.findOne({ where: { abbrev: req.body.country }, attributes: ['id'] });
    let area = await Area.findOne({ where: { name: req.body.area }, attributes: ['id'] });
    await Sequelize.transaction(async (t) => {
      await User.update(
        {
          idtypeId: idtype.id,
          roleId: role.id,
          countryId: country.id,
          areaId: area.id,
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
        { model: Role },
        { model: Country },
        { model: Area },
        { model: IdType }], where: { createdById: me },
      attributes: { exclude: ['password', 'username', 'reset_password', 'updatedBy'] }
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
