import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export const getStatus = async (req, res) => {
  return res
    .status(200)
    .json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
};

export const getStats = async (req, res) => {
  res
    .status(200)
    .json({ users: await dbClient.nbUsers(), files: await dbClient.nbFiles() });
};
