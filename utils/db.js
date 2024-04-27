import { MongoClient } from "mongodb";

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || "localhost";
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || "files_manager";

    this.client = new MongoClient(`mongodb://${host}:${port}`, {
      useUnifiedTopology: true,
    });
    this.dbName = database;

    this.client.connect((err) => {
      if (err) {
        console.error("MongoDB Connection Error:", err);
      } else {
        console.log("Connected successfully to MongoDB");
      }
    });
  }

  static isAlive() {
    return !!this.client && this.client.isConnected();
  }

  static async nbUsers() {
    return this.client.db(this.dbName).collection("users").countDocuments();
  }

  static async nbFiles() {
    return this.client.db(this.dbName).collection("files").countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
