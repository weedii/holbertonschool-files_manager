import redisClient from "./utils/redis.js";

(async () => {
  await console.log("aaaaaa", redisClient);
  await console.log(redisClient.isAlive());
  await console.log(await redisClient.get("myKey"));
  await redisClient.set("myKey", 12, 5);
  console.log(await redisClient.get("myKey"));

  setTimeout(async () => {
    console.log(await redisClient.get("myKey"));
  }, 1000 * 10);
})();
