//login-subscriber

const amqp = require('amqplib');
const addUserToMongoDB = require('../controller/login-subscribe');

async function consumeQueueAndPostToDatabase() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Assert the existence of the queue
    await channel.assertQueue('auth_queue', { durable: false });

    // Consume messages from the queue
    channel.consume('auth_queue', async (message) => {
      if (message !== null) {
        const data = message.content.toString();
        console.log('Received message from queue:', data);

        // Check if the message content is not empty
        if (data.trim() !== '') {
          // Parse the data from the message
          try {
            const { username } = JSON.parse(data);

            // Insert the user data into MongoDB
            await addUserToMongoDB(username);
            channel.ack(message);
          } catch (parseError) {
            console.error('Error parsing message data:', parseError.message);
          }
        } else {
          console.error('Received empty message from the queue.......');
        }
      }
    });
  } catch (error) {
    console.error('Error consuming queue and posting to database:', error.message);
    throw error;
  }
}

module.exports = consumeQueueAndPostToDatabase;













// // auth-service/Subscriber/login-subscribe.js

// const amqp = require('amqplib');
// const { consumeQueueAndPostToDatabase } = require('../controller/login-subscribe');

// async function startSubscriber() {
//   try {
//     const connection = await amqp.connect('amqp://localhost');
//     const channel = await connection.createChannel();

//     await channel.assertQueue('auth_queue', { durable: false });

//     channel.consume('auth_queue', async (message) => {
//       await consumeQueueAndPostToDatabase(channel, message);
//     });
//   } catch (error) {
//     console.error('Error consuming queue and posting to database:', error.message);
//     throw error;
//   }
// }

// module.exports = { startSubscriber };
















