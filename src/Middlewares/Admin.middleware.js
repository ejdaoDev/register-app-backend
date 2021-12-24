import jwt from "jsonwebtoken";
import config from "../config";
import User from "../Models/Security/User";
import Role from "../Models/Security/Role";
import UserRole from "../Models/Security/UserRole";
export const isAdmin = async (req, res, next) => {
  const jwtToken = req.headers["x-access-token"];

  const decoded = jwt.verify(jwtToken, config.SECRET);
  let roles = await UserRole.findAll({
    where: {
      userId: decoded.id,
    },
  });
  
  let isAdmin = 0;
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].dataValues.roleId == 1) {
      isAdmin++;
    }
  }

  if (isAdmin != 0) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};
