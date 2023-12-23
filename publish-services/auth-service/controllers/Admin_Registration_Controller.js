const queueNames = require('../../../api-gateway/Rabbitmq/Queue.json');
const  publishToQueue =  require('../../../api-gateway/SendingToQueue/publishToQueue.cjs');


exports.Registeration = async (req, res) => {
  try {
    const queues = queueNames.Auth_user;
    const data = req.body;
// console.log(queues.Admin_Reg);
    await publishToQueue(queues.Admin_Reg, JSON.stringify(data));
    res.status(200).json({ message: 'Registration successful' });
  } 
  catch (error) {
    console.error('Error during registration:', error.message);
    res.status(400).json({ message: 'Registration unsuccessful' });
  }
};

// async function publishToQueue(queue, data) {
//   try {
//     // Check if connection and channel are not already created
//     if (!connection || !channel) {
//       // Create a new connection and channel
//       connection = await amqp.connect('amqp://localhost');
//       channel = await connection.createChannel();
//     }

//     // Ensure that the queue name is correct
//     const queueName = queue.Admin_Reg;

//     await channel.assertQueue(queueName, { durable: false });
//     channel.sendToQueue(queueName, Buffer.from(data));
//   } catch (error) {
//     console.error('Error publishing to queue:', error.message);
//     throw error;
//   }
// }
