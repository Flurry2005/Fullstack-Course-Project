import dotenv from "dotenv";
dotenv.config();

import { app } from "./src/express.js";
import DatabaseConnection from "./services/DatabaseConnection.js";

DatabaseConnection.connect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
