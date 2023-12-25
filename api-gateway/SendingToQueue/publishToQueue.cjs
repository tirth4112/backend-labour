const amqp = require('amqplib');
let connection;
let channel;

async function publishToQueue(queue, data) {
  try {
    // Check if connection and channel are not already created
    if (!connection || !channel) {
      // Create a new connection and channel
      connection = await amqp.connect('amqp://localhost');
      channel = await connection.createChannel();
    }

    // Ensure that the queue name is correct
    const queueName = queue;
    console.log(queueName);
    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(data));
  } catch (error) {
    console.error('Error publishing to queue:', error.message);
    throw error;
  }
}

module.exports = publishToQueue;
