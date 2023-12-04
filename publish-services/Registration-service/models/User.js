// // auth-service/models/User.js
// class User {
//     constructor(username, password) {
//       this.username = username;
//       this.password = password;
//     }
//   }
  
//   module.exports = User;
  

// registration-service/models/registrationModel.js
// This is a simple in-memory storage example, replace it with a database integration

const amqp = require('amqplib');

const rabbitMQServer = 'amqp://localhost';
const registerQueue = 'register_queue';

const registrations = [];

async function publishToQueue(data) {
  const connection = await amqp.connect(rabbitMQServer);
  const channel = await connection.createChannel();
  await channel.assertQueue(registerQueue, { durable: false });
  channel.sendToQueue(registerQueue, Buffer.from(data));
}

async function registerUser(registrationData) {
  // Add registration logic here
  registrations.push(registrationData);
}

module.exports = {
  publishToQueue,
  registerUser,
};
