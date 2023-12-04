
// main.js
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
import amqp from 'amqplib';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const authProxy = createProxyMiddleware('/', {
  target: 'http://localhost:3001',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error('Auth Proxy Error:', err);
    res.status(500).send('Auth Proxy Error');
  },
});

const registrationProxy = createProxyMiddleware('/register', {
  target: 'http://localhost:3002',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error('Registration Proxy Error:', err);
    res.status(500).send('Registration Proxy Error');
  },
});

const employeeProxy = createProxyMiddleware('/employees', {
  target: 'http://localhost:3003',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error('Employee Proxy Error:', err);
    res.status(500).send('Employee Proxy Error');
  },
});

app.use(authProxy);
app.use(registrationProxy);
app.use(employeeProxy);

// RabbitMQ setup
const rabbitMQServer = 'amqp://localhost';
const authQueue = 'auth_queue';
const registerQueue = 'register_queue';

// Connect to RabbitMQ and set up the channels
amqp.connect(rabbitMQServer, (error0, connection) => {
  if (error0) {
    throw error0;
  }

  // Create channels
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    // Assert queues
    channel.assertQueue(authQueue, { durable: false });
    channel.assertQueue(registerQueue, { durable: false });

    // Consume messages from queues
    channel.consume(authQueue, (msg) => {
      if (msg !== null) {
        console.log(`Received message from ${authQueue}: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });

    channel.consume(registerQueue, (msg) => {
      if (msg !== null) {
        console.log(`Received message from ${registerQueue}: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Main server is running on port ${port}`);
});
