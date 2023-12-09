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







// Load Balancer Logic
const amqp = require('amqplib');
const MIN_SUBSCRIBERS = 1; // Minimum number of subscribers
const MAX_SUBSCRIBERS = 5; // Maximum number of subscribers
const QUEUE_NAME = 'auth_queue'; // Replace with your actual queue name
const subscribers = [];

async function getMessageBacklog(queueName) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const { messageCount } = await channel.checkQueue(queueName);
    console.log(`Message Backlog for ${queueName}: ${messageCount}`);
    
    await connection.close();
    return messageCount;
  } catch (error) {
    console.error('Error getting message backlog:', error.message);
    return -1; // Return -1 to indicate an error
  }
}

function scaleUp() {
  const newSubscriber = fork('./Subscriber/login-subscribe'); // Start a new subscriber instance
  subscribers.push(newSubscriber);
  console.log('Scaled up. Total subscribers:', subscribers.length);
}

function scaleDown() {
  const lastSubscriber = subscribers.pop();
  lastSubscriber.kill(); // Terminate the last subscriber instance
  console.log('Scaled down. Total subscribers:', subscribers.length);
}

async function checkAndScale() {
  const messageBacklog = await getMessageBacklog(QUEUE_NAME);

  // Example: Scale up if message backlog is high
  if (messageBacklog > 50 && subscribers.length < MAX_SUBSCRIBERS) {
    scaleUp();
  }

  // Example: Scale down if message backlog is low
  if (messageBacklog < 10 && subscribers.length > MIN_SUBSCRIBERS) {
    scaleDown();
  }
}
setInterval(checkAndScale, 10000);











