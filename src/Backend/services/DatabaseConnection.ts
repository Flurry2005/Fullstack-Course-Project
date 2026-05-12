import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local" });
}

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
}
class DatabaseConnection {
  #client!: Mongoose;

  async connect() {
    if (this.#client != null) return;
    try {
      this.#client = await mongoose.connect(process.env.DB_URL!);
      console.log("Database connection established");
    } catch (error) {
      console.error(error);
    }
  }
}

export default new DatabaseConnection();
