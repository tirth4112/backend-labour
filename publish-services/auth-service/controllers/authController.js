const User = require('../models/User');
const amqp = require('amqplib');

exports.login = async (req, res) => {
  const { username, password } = req.query;
  await publishToQueue('auth_queue', JSON.stringify({ username }));
  res.status(200).json({ message: 'Login successful' });
};

async function publishToQueue(queue, data) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(data));
}
