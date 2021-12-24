const User = require("../../Models/Security/User");
import jwt from "jsonwebtoken";
import config from "../../config";

export async function getUserLogged(req) {
  const jwtToken = req.headers["x-access-token"];
  const decoded = jwt.verify(jwtToken, config.SECRET);
  let me = await User.findOne({
    where: {
      id: decoded.id,
    },
  });
  return me;
}