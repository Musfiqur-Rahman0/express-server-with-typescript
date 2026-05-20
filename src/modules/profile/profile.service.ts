import { pool } from "../../db";
import type { IProfile } from "./profile.interface";

const createUserProfileInDB = async (payload: IProfile) => {
  const { user_id, bio, address, gender, phone } = payload;

  //   console.log(payload);
  const user = await pool.query(
    `
        SELECT * FROM users WHERE id=$1  
    `,
    [user_id],
  );

  //   console.log(user.rows);
  const userExits = user.rows.length !== 0;

  if (!userExits) {
    throw new Error("User doesn't  exists");
  }

  const result = await pool.query(
    `
        INSERT INTO profiles(user_id, bio, address, phone, gender) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [user_id, bio, address, gender, phone],
  );
  //   console.log(result);

  return result;
};

export const profileService = {
  createUserProfileInDB,
};
