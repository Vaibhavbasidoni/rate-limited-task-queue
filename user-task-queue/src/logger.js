const fs = require('fs').promises;
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');
const logFile = path.join(logsDir, 'task-logs.txt');

const ensureLogDir = async () => {
  try {
    await fs.mkdir(logsDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.error('Error creating logs directory:', error);
    }
  }
};

const logTask = async (userId, timestamp) => {
  await ensureLogDir();
  const logEntry = `${userId}-task completed at-${timestamp}\n`;
  try {
    await fs.appendFile(logFile, logEntry);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
};

module.exports = { logTask };