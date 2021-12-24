import jwt from "jsonwebtoken";

export const isAdmin = async (req, res, next) => {
  const jwtToken = req.headers["x-access-token"];
  const decoded = jwt.verify(jwtToken, process.env.SECRET);
  if (decoded.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};
