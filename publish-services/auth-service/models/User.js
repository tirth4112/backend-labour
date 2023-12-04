
const amqp = require('amqplib');

const rabbitMQServer = 'amqp://localhost';
const authQueue = 'auth_queue';

const users = [
  { username: 'user', password: 'pass' },
  // Add more users as needed
];



async function authenticateUser(username, password) {
  const user = users.find((u) => u.username === username && u.password === password);
  return user !== undefined;
}

module.exports = {
  users,
  authenticateUser,
};
