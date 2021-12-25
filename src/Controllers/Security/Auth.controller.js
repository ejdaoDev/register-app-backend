import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const { Op } = require("sequelize");
import Role from "../../Models/Security/Role";
import User from "../../Models/Security/User";

export const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({
    include: [{ model: Role, attributes: ['name'] }],
    where: {
      [Op.or]: [{ email: email }, { username: email }],
    }
  });

  if (!user) {
    res.json({ status: 204, data: { message: "invalid credentials" } })
  } else {
    let comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      res.json({ status: 204, data: { message: "invalid credentials" } });
    } else {
      const token = jwt.sign({ id: user.id, role: user.role.name }, process.env.SECRET, {
        expiresIn: 86400, //24 Horas
      });

      res.json({ status: 200, data: { user: user, token: token } });

    }
  }
};
