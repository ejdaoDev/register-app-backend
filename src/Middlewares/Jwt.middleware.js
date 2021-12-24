import jwt from "jsonwebtoken";
import config from "../config";
export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, config.SECRET, (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({ message: "no token provided" });
  }
};
