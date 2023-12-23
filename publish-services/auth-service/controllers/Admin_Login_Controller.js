const amqp = require('amqplib');
const queueNames=require('../../../api-gateway/Rabbitmq/Queue.json')
exports.Admin_Login_Controller = async (req, res) => {
try
{  const queues = queueNames.Auth_user;

  const data = req.query;
console.log(data.username);
  if(data.username==undefined || data.password==undefined)
  { 
    res.status(500).json({ message: 'Empty Field' });

  }
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