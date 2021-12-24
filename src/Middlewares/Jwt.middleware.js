import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.SECRET, (err) => {
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
