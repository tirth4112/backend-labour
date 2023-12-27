import amqp from 'amqplib';
import Admin_Login_Successful_Controller from '../controller/Admin_Login_Successful_Controller.js';
import queueNames from '../../../api-gateway/Rabbitmq/Queue.json' assert { type: "json" };

async function Admin_Login_Successful_subscribe() {
  try {
    const queues = queueNames.Auth_user.Admin_Login;

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queues.Admin_Successful_Log, { durable: false });

    channel.consume(queues.Admin_Reg, async (message) => {
      if (message !== null) {
        const data = message.content.toString();
        console.log('Received message from queue:', data);

        try {
          const userId = JSON.parse(data);

          await Admin_Login_Successful_Controller(userId);

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

export default Admin_Login_Successful_subscribe;
