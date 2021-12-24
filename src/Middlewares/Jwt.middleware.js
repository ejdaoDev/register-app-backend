import jwt from "jsonwebtoken";
import config from "../config";
import User from "../Models/Security/User";
export const verifyToken = async (req, res, next) => {
  try {
    const jwtToken = req.headers["x-access-token"];

    if (!jwtToken)
      return res.status(403).json({ message: "no token provided" });

    const decoded = jwt.verify(jwtToken, config.SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) res.status(404).json({ message: "user no found" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
