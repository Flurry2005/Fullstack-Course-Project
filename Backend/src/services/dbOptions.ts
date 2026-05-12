import dotenv from "dotenv";
import fs from "fs";
if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local" });
}

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
}

export const options = {
  auth: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
  },
  authSource: "admin",
};
