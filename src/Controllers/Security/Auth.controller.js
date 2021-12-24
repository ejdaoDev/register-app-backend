const User = require("../../Models/Security/User");
import jwt from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcryptjs";
const { Op } = require("sequelize");
import Role from "../../Models/Security/Role";

export const login = async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({
    include: [{ model: Role, attributes: ['name'] }],
    where: {
      [Op.or]: [{ email: username }, { username: username }],
    }
  });

  if (!user) {
    res.status(200).json({ type: "204", error: "credenciales invalidas" })
  } else {
    let comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      res.status(200).json({ type: "204", error: "credenciales invalidas" });
    } else {
      const token = jwt.sign({ id: user.id, role:user.role.name }, config.SECRET, {
        expiresIn: 86400, //24 Horas
      });
      res.status(200).json({ type: "200", data: { user: user, token: token } });

    }
  }
};
