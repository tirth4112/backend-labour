
// cd backend-labour/publish-services/Registration-service
// registration-service/app.js
const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib');
// const consumeQueueAndPostToDatabase = require('./consumers/loginqueue');
const app = express();
const port = 3003;

app.use(bodyParser.json());

const rabbitMQServer = 'amqp://localhost';
const registerQueue = 'register_queue';
// consumeQueueAndPostToDatabase();

app.post('/register', async (req, res) => {
  // Registration logic here

  // Publish a message to the RabbitMQ queue
  await publishToQueue(registerQueue, JSON.stringify({ registrationData }));

  res.json({ message: 'Registration successful' });
});

async function publishToQueue(queue, data) {
  const connection = await amqp.connect(rabbitMQServer);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(data));
}

app.listen(port, () => {
  console.log(`Registration service is running on port ${port}`);
});
