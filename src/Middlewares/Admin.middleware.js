import jwt from "jsonwebtoken";
import config from "../config";

export const isAdmin = async (req, res, next) => {
  const jwtToken = req.headers["x-access-token"];
  const decoded = jwt.verify(jwtToken, config.SECRET);
  if (decoded.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};
