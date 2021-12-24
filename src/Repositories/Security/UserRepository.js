const User = require("../../Models/Security/User");
import bcrypt from "bcryptjs";
import Role from "../../Models/Security/Role";
import UserRole from "../../Models/Security/UserRole";
import * as UserService from "../../Services/Security/UserService";
const Sequelize = require("../../database");


export async function create(req) {
  let me = await UserService.getUserLogged(req);
  try { 
    await Sequelize.transaction(async (t) => {
      let photo = null;
      if(req.body.photo != 'null'){
        photo = "http://localhost:3000/"+req.file.filename;
      }
      await User.create(
        {          
          photo: photo,
          idtypeId: req.body.idtypeId,
          idnumber: req.body.numberid,
          firstname: req.body.firstname,
          secondname: req.body.secondname,
          firstlastname: req.body.firstlastname,
          secondlastname: req.body.secondlastname,
          email: req.body.email,
          username: null,
          createdBy: me.id,
          updatedBy: me.id,
          token: { token: req.body.email },
        },
        {
          include: "token",
        },
        { transaction: t }
      );

      let user = await User.findOne(
        {
          where: { email: req.body.email },
        },
        { transaction: t }
      );

      await UserRole.create(
        {
          userId: user.id,
          roleId: req.body.roleId,
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