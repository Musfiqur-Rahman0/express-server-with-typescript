import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";
import generateToken from "../../utility/generateToken";

interface userInfo {
  email: string;
  password: string;
}

const loginUserIntoDB = async (payload: userInfo) => {
  const { email, password } = payload;

  //   CLIENT THEKE EMAIL PASSWORD GRAB KORTE HOBE --DONE
  //   THEN EMAIL DIA CHECK KORTE HOBE DB TE
  //   THEN PASWORD MATCH KORTE HOBE
  //   THEN USER A JWT TOKEN DITE HOBE

  const userInfo = await pool.query(
    `
        SELECT * FROM  users WHERE email=$1
    `,
    [email],
  );

  const user = userInfo.rows[0];

  if (user.length === 0) {
    throw new Error("User not found");
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalied Credentials");
  }

  const jwtpayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    email: user.email,
  };

  const accessToken = generateToken(jwtpayload, config.Secret, "1d");
  const refreshToken = generateToken(jwtpayload, config.refresh, "30d");

  return { accessToken, refreshToken };
};

export const authService = {
  loginUserIntoDB,
};
