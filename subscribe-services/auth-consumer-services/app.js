// auth-service/app.js
const express = require('express');
const bodyParser = require('body-parser');
const consumeQueueAndPostToDatabase=require('./Subscriber/login-subscribe')
const app = express();
const port = 3002;
app.use(bodyParser.json());
consumeQueueAndPostToDatabase();
app.listen(port, () => {
  console.log(`Auth subscribe service is running on port ${port}`);
});



















// // loadBalancer.js
// const { fork } = require('child_process');

// const MIN_SUBSCRIBERS = 1; // Minimum number of subscribers
// const MAX_SUBSCRIBERS = 5; // Maximum number of subscribers

// const subscribers = [];

// function scaleUp() {
//   const newSubscriber = fork('subscriber.js'); // Start a new subscriber instance
//   subscribers.push(newSubscriber);
//   console.log('Scaled up. Total subscribers:', subscribers.length);
// }

// function scaleDown() {
//   const lastSubscriber = subscribers.pop();
//   lastSubscriber.kill(); // Terminate the last subscriber instance
//   console.log('Scaled down. Total subscribers:', subscribers.length);
// }

// // Implement your dynamic scaling policy here (e.g., based on message backlog)

// // Example: Scale up if message backlog is high
// const messageBacklog = 100;
// if (messageBacklog > 50 && subscribers.length < MAX_SUBSCRIBERS) {
//   scaleUp();
// }

// // Example: Scale down if message backlog is low
// if (messageBacklog < 10 && subscribers.length > MIN_SUBSCRIBERS) {
//   scaleDown();
// }
