const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(process.env.REDIS_URL);
const incrAsync = promisify(client.incr).bind(client);
const expireAsync = promisify(client.expire).bind(client);

const rateLimiter = async (req, res, next) => {
  const { user_id } = req.body;
  const secondKey = `rateLimit:${user_id}:second`;
  const minuteKey = `rateLimit:${user_id}:minute`;

  const [secondCount, minuteCount] = await Promise.all([
    incrAsync(secondKey),
    incrAsync(minuteKey),
  ]);

  if (secondCount === 1) await expireAsync(secondKey, 1);
  if (minuteCount === 1) await expireAsync(minuteKey, 60);

  if (secondCount > 1 || minuteCount > 20) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  next();
};

module.exports = rateLimiter;