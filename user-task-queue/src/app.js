require('dotenv').config();
const express = require('express');
const taskQueue = require('./taskQueue');
const rateLimiter = require('./rateLimiter');
const taskProcessor = require('./taskProcessor');

const app = express();
app.use(express.json());

app.post('/task', rateLimiter, async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  await taskQueue.addTask(user_id);
  res.status(202).json({ message: 'Task queued successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  taskProcessor.start();
});