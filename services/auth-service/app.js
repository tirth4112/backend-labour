// auth-service/app.js
const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const consumeQueueAndPostToDatabase = require('./consumers/loginqueue');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/login', authController.login);
consumeQueueAndPostToDatabase();

app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
});






// auth-service/app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const amqp = require('amqplib');

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());

// const rabbitMQServer = 'amqp://localhost';
// const authQueue = 'auth_queue';

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   if (username === 'user' && password === 'pass') {
//     await publishToQueue(authQueue, JSON.stringify({ username }));
//     res.json({ message: 'Login successful' });
//   } else {
//     res.status(401).json({ message: 'Login failed' });
//   }
// });

// async function publishToQueue(queue, data) {
//   const connection = await amqp.connect(rabbitMQServer);
//   const channel = await connection.createChannel();
//   await channel.assertQueue(queue, { durable: false });
//   channel.sendToQueue(queue, Buffer.from(data));
// }

// app.listen(port, () => {
//   console.log(`Auth service is running on port ${port}`);
// });
