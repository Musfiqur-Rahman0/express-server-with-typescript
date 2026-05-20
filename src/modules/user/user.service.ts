import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { Iuser } from "./user.interface";

const createUserIntoDB = async (payload: Iuser) => {
  const { name, email, password, age, role } = payload;
  // console.log(payload);
  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `
      INSERT INTO users (name, email, password, age, role) VALUES ($1, $2, $3, $4, COALESCE($5,'USER')) RETURNING *
    `,
    [name, email, hashedPassword, age, role],
  );

  delete result.rows[0].password;

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await pool.query(
    "SELECT id, name, email, role, is_active, created_at, updated_at FROM users",
  );

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id = $1`,
    [id],
  );

  return result;
};

const updateUserFromDB = async (payload: Iuser, id: string) => {
  const { name, password, age } = payload;

  const result = await pool.query(
    `
     UPDATE users SET name =COALESCE($1, name),  password = COALESCE($2, password), age = COALESCE($3, age), updated_at = NOW() WHERE id = $4 RETURNING *
    `,
    [name, password, age, id],
  );

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
        DELETE FROM users where id = $1 RETURNING *
      `,
    [id],
  );

  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
