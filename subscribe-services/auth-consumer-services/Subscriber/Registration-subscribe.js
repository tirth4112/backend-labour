import amqp from 'amqplib';
import Admin_Registration_Controller from '../controller/Admin_Registration_Controller.js';
import queueNames from '../../../api-gateway/Rabbitmq/Queue.json' assert { type: "json" };

async function consumeQueueAndPostToDatabase() {
  try {
    const queues = queueNames.Auth_user;

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queues.Admin_Reg, { durable: false });

    channel.consume(queues.Admin_Reg, async (message) => {
      if (message !== null) {
        const data = message.content.toString();
        console.log('Received message from queue:', data);

        try {
          const da= JSON.parse(data);

          await Admin_Registration_Controller(da);

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
