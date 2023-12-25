import amqp from 'amqplib';
import Admin_ForgetPassword_Controller from '../controller/Admin_ForgetPassword_Controller.js';
import queueNames from '../../../api-gateway/Rabbitmq/Queue.json' assert { type: "json" };

async function Admin_ForgetPassword() {
  try {
    const queues = queueNames.Auth_user.Admin_Login;

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queues.Admin_ForgetPassword, { durable: false });

    channel.consume(queues.Admin_ForgetPassword, async (message) => {
      if (message !== null) {
        const data = message.content.toString();
        console.log('Received message from queue:', data);

        try {
          const da= JSON.parse(data);

          await Admin_ForgetPassword_Controller(da);

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

export default Admin_ForgetPassword;
