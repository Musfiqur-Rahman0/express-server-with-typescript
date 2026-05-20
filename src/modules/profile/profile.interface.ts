export interface IProfile {
  user_id: number;
  bio: string;
  address: string;
  phone: string;
  gender: string;
}

//    id SERIAL PRIMARY KEY,
//       user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

//       bio TEXT,
//       address TEXT,
//       phone VARCHAR(15),
//       gender VARCHAR(10),

//       created_at TIMESTAMP DEFAULT NOW(),
//       updated_at TIMESTAMP DEFAULT NOW()
