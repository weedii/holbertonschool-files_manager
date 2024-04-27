import Redis from "redis";

class RedisClient {
  constructor() {
    this.client = Redis.createClient();
    this.connected = false;

    this.client.on("connect", () => {
      this.connected = true;
    });

    this.client.on("end", () => {
      this.connected = false;
    });

    this.client.on("error", (err) => {
      console.error("Redis client error:", err);
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) {
          console.error("Error in get:", err); // Add this line for debugging
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
