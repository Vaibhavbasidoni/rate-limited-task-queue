const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(process.env.REDIS_URL);
const lpushAsync = promisify(client.lpush).bind(client);
const rpopAsync = promisify(client.rpop).bind(client);

const addTask = async (userId) => {
  await lpushAsync(`tasks:${userId}`, Date.now());
};

const getNextTask = async (userId) => {
  return await rpopAsync(`tasks:${userId}`);
};

module.exports = { addTask, getNextTask };