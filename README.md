User Task Queuing with Rate Limiting

This project implements a Node.js API cluster with two replica sets, handling user tasks with rate limiting and queueing.

Features

- Node.js API cluster with two replica sets
- Rate limiting: 1 task per second and 20 tasks per minute per user ID
- Task queueing system using Redis
- Logging of completed tasks

Prerequisites

- Node.js (v14+ recommended)
- Redis server

Installation

1. Clone the repository:
   git clone <repository-url>
   cd user-task-queuing

2. Install dependencies:
   npm install

3. Set up environment variables:
   Create a .env file in the root directory with the following content:
   PORT=3000
   REDIS_URL=redis://localhost:6379

Running the Application

1. Start Redis server
2. Run the application:
   npm start

API Usage

Send a POST request to /task with a JSON body containing a user_id:

POST http://localhost:3000/task
Content-Type: application/json

{
    "user_id": "123"
}

Architecture and Approach

This solution uses a Node.js cluster to create two worker processes, improving performance and reliability. Redis is used for task queueing and rate limiting, ensuring efficient task management across cluster instances.

Key components:
- cluster.js: Sets up the Node.js cluster
- app.js: Express application handling API requests
- taskQueue.js: Manages task queueing using Redis
- rateLimiter.js: Implements rate limiting logic
- taskProcessor.js: Processes queued tasks according to rate limits
- logger.js: Handles logging of completed tasks

The system ensures that no requests are dropped, and tasks exceeding the rate limit are queued for later processing.

Assumptions

1. Redis is used as the queueing and rate limiting backend for simplicity and efficiency.
2. The current implementation processes tasks for a fixed set of user IDs. In a production environment, this would be dynamically managed.
3. Error handling assumes a development environment. Production deployment would require more robust error handling and logging.
4. The task function is a simple console log and file write. In a real-world scenario, this would be replaced with actual task processing logic.

Future Improvements

1. Implement dynamic management of user queues based on incoming requests.
2. Add more comprehensive error handling and logging for production use.
3. Implement a cleanup mechanism for Redis keys to prevent memory buildup.
4. Add unit and integration tests to ensure reliability.
