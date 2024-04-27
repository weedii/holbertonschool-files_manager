import redis from "redis";

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on("connect", () => {
      console.log("Connected to Redis server");
    });

    this.client.on("error", (err) => {
      console.error("Redis client error:", err);
    });

    // Connect explicitly when an instance is created
    this.client.connect();
  }

  async isAlive() {
    // Wait for the client to connect before checking its status
    await new Promise((resolve) => {
      this.client.on("connect", () => {
        resolve();
      });
    });
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) {
          console.error("Error in get:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
