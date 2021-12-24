import jwt from "jsonwebtoken";

export async function getAuthId(req) {
  const jwtToken = req.headers["x-access-token"];
  const decoded = jwt.verify(jwtToken, process.env.SECRET);
  return decoded.id;
}
