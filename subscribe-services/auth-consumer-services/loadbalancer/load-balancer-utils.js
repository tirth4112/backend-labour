// // auth-service/load-balancer/load-balancer-utils.js

// const amqp = require('amqplib');

// async function getMessageBacklog(queueName) {
//   try {
//     const connection = await amqp.connect('amqp://localhost');
//     const channel = await connection.createChannel();

//     const { messageCount } = await channel.checkQueue(queueName);
//     console.log(`Message Backlog for ${queueName}: ${messageCount}`);
    
//     await connection.close();
//     return messageCount;
//   } catch (error) {
//     console.error('Error getting message backlog:', error.message);
//     return -1;
//   }
// }

// function scaleUp(subscribers) {
//   const newSubscriber = fork('../Subscriber/login-subscribe'); // Start a new subscriber instance
//   subscribers.push(newSubscriber);
//   console.log('Scaled up. Total subscribers:', subscribers.length);
// }

// function scaleDown(subscribers) {
//   const lastSubscriber = subscribers.pop();
//   lastSubscriber.kill(); // Terminate the last subscriber instance
//   console.log('Scaled down. Total subscribers:', subscribers.length);
// }

// module.exports = { getMessageBacklog, scaleUp, scaleDown };
