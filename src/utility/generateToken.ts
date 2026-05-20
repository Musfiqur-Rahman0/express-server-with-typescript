import type { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
const generateToken = (
  payload: JwtPayload,
  secret: string,
  time?: any,
): string => {
  const token = jwt.sign(payload, secret, {
    expiresIn: time,
  });
  return token;
};

export default generateToken;
