import dotenv from "dotenv";

import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const config = {
  port: process.env.PORT || 3000,
  connectionString: process.env.CONNECTION_STRING || "",
  Secret: process.env.SECRET || "musfiqurrahman8",
  refresh: process.env.SK_REFRESH || "nothing",
};

export default config;
