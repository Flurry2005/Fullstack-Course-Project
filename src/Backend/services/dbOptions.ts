import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

export const options = {
  auth: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
  },
  authSource: "admin",
};
