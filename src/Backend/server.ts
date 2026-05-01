import dotenv from "dotenv";
dotenv.config();

import { app } from "./src/express.js";
import DatabaseConnection from "./services/DatabaseConnection.js";
import SocketHandler from "./socket/SocketHandler.js";

DatabaseConnection.connect();

const PORT = Number(process.env.PORT) || 3000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

new SocketHandler(server);
