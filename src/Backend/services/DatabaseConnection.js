// Import the MongoClient using ES module syntax
import { MongoClient } from "mongodb";
import { options } from "./dbOptions.js";

class DatabaseConnection {
  // Connection string (local or Atlas)
  #uri = "mongodb://129.151.206.68:27017"; // or your Atlas URI
  db;
  #connection;

  async connect() {
    if (this.#connection != null) return;
    console.log(options.auth);
    const client = new MongoClient(this.#uri, options);

    try {
      await client.connect();
      this.db = client.db("Application");
    } catch (error) {
      console.error(error);
    }
  }
}

export default new DatabaseConnection();
