// // auth-service/load-balancer/load-balancer.js

// const { fork } = require('child_process');
// const { getMessageBacklog, scaleUp, scaleDown } = require('./load-balancer-utils');
// // const { consumeQueueAndPostToDatabase } = require('../controller/login-subscribe');

// // Load Balancer Logic
// const MIN_SUBSCRIBERS = 1; // Minimum number of subscribers
// const MAX_SUBSCRIBERS = 5; // Maximum number of subscribers
// const QUEUE_NAME = 'auth_queue'; // Replace with your actual queue name
// const subscribers = [];

// async function startLoadBalancer() {
//   setInterval(checkAndScale, 10000);
// }

// async function checkAndScale() {
//   const messageBacklog = await getMessageBacklog(QUEUE_NAME);

//   // Example: Scale up if message backlog is high
//   if (messageBacklog > 50 && subscribers.length < MAX_SUBSCRIBERS) {
//     scaleUp(subscribers);
//   }

//   // Example: Scale down if message backlog is low
//   if (messageBacklog < 10 && subscribers.length > MIN_SUBSCRIBERS) {
//     scaleDown(subscribers);
//   }
// }

// module.exports = { startLoadBalancer, subscribers };
