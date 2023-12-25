import amqp from 'amqplib';
import Admin_Login_UnSuccessful_Controller from '../controller/Admin_Login_UnSuccessful_Controller.js';
import queueNames from '../../../api-gateway/Rabbitmq/Queue.json' assert { type: "json" };

async function Admin_Login_unSuccessful_subscribe() {
  try {
    const queues = queueNames.Auth_user.Admin_Login;

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queues.Admin_False_Log, { durable: false });

    channel.consume(queues.Admin_False_Log, async (message) => {
      if (message !== null) {
        const data = message.content.toString();
        console.log('Received message from queue:', data);

        try {
          const { username } = JSON.parse(data);

          await Admin_Login_UnSuccessful_Controller(username);

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

export default Admin_Login_unSuccessful_subscribe;
