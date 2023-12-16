
import amqp from 'amqplib'
import addUserToMongoDB from '../controller/login-subscribe.js';
async function consumeQueueAndPostToDatabase() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue('auth_queue', { durable: false });

    channel.consume('auth_queue', async (message) => {
      if (message !== null) {
        const data = message.content.toString();
        console.log('Received message from queue:', data);

        try {
          const { username } = JSON.parse(data);

          await addUserToMongoDB(username);

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




export default consumeQueueAndPostToDatabase;