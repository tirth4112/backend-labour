const amqp = require('amqplib');
const addUserToMongoDB=require('../controller/login-subscribe')
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
  
          // Parse the data from the message
          try {
            const { username } = JSON.parse(data);
  
            // Insert the user data into MongoDB
            await addUserToMongoDB(username);
            // console.log('User added to MongoDB successfully.');
  
            // Acknowledge the message to remove it from the queue
            channel.ack(message);
          } catch (parseError) {
            console.error('Error parsing message data:', parseError.message);
          }
        }
      });
    } catch (error) {
      console.error('Error consuming queue and posting to database:', error.message);
      throw error;
    }
  }


  

module.exports = consumeQueueAndPostToDatabase;