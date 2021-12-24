const User = require("../../Models/Security/User");
import bcrypt from "bcryptjs";
import Role from "../../Models/Security/Role";
import IdType from "../../Models/Security/IdType";
import * as UserService from "../../Services/Security/UserService";
import CreateEmailService from "../../Services/Security/CreateEmailService";
import Area from "../../Models/Security/Area";
import Country from "../../Models/Security/Country";
const Sequelize = require("../../database");


export async function create(req) {
  let me = await UserService.getUserLogged(req);
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


/*
export async function register(req) {
  try {
    await Sequelize.transaction(async (t) => {
      await User.create(
        {
          idtypeId: null,
          idnumber: null,
          firstname: req.body.firstname,
          secondname: req.body.secondname,
          firstlastname: req.body.firstlastname,
          secondlastname: req.body.secondlastname,
          email: req.body.email,
          username: null,
          password: await bcrypt.hash(req.body.password,await bcrypt.genSalt(10)),
          token: { token: req.body.email },
        },
        {
          include: "token",
        },
        { transaction: t }
      );

      let me = await User.findOne(
        {
          where: { email: req.body.email },
        },
        { transaction: t }
      );

      const role = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      await UserRole.create(
        {
          userId: me.id,
          roleId: role.id,
        },
        { transaction: t }
      );
    });
    return true;
  } catch (error) {
    console(error);
    return false;
  }
}

export async function update(req) {
  let me = await UserService.getUserLogged(req);
  try { 
    await Sequelize.transaction(async (t) => {
      await User.update(
        {
          idtypeId: req.body.idtypeId,
          idnumber: req.body.numberid,
          firstname: req.body.firstname,
          secondname: req.body.secondname,
          firstlastname: req.body.firstlastname,
          secondlastname: req.body.secondlastname,
          email: req.body.email,
          username: null,
          updatedBy: me.id,
        },{
          where: { id: req.params.id }
        },
        { transaction: t }
      );

      await UserRole.update(
        {
          roleId: req.body.roleId,
        },{
          where: { userId: req.params.id }
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
/*
En caso de usar multiples roles
      let me = await User.findOne({where: { email: req.body.email }},
        { transaction: t }
      );
      for (let i = 0; i < req.body.roles.length; i++) {
        const role = await Role.findOne({
          where: {
            name: req.body.roles[i],
          },
        });
        await UserRole.create(
          {
            userId: me.id,
            roleId: role.id,
          },
          { transaction: t }
        );
      }
*/