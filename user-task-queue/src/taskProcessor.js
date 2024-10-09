const taskQueue = require('./taskQueue');
const logger = require('./logger');

const processTask = async (userId) => {
  console.log(`${userId}-task completed at-${Date.now()}`);
  await logger.logTask(userId, Date.now());
};

const processUserQueue = async (userId) => {
  const task = await taskQueue.getNextTask(userId);
  if (task) {
    await processTask(userId);
    setTimeout(() => processUserQueue(userId), 1000); // Wait 1 second before processing the next task
  } else {
    setTimeout(() => processUserQueue(userId), 100); // Check again after 100ms if no task is found
  }
};

const start = () => {
  // Start processing for a fixed set of user IDs (in a real scenario, this would be dynamic)
  const userIds = ['123', '456', '789'];
  userIds.forEach(userId => processUserQueue(userId));
};

module.exports = { start };