const User = require('../models/User');
const amqp = require('amqplib');
const queueNames=require('../../../api-gateway/Rabbitmq/Queue.json')
exports.login = async (req, res) => {
try
{  const queues = queueNames.Auth_user;


  console.log(queues.Admin_Reg)
  const { username, password } = req.query;
  await publishToQueue(queues, JSON.stringify({ username }));
  res.status(200).json({ message: 'Login successful' });
}
catch(c)
{
  res.status(400).json({ message: 'Login ussuccessful' });
 
}
};

async function publishToQueue(queue, data) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue.Admin_Reg, { durable: false });
  channel.sendToQueue(queue.Admin_Reg, Buffer.from(data));
}
