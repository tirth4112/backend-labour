// cd backend-labour/subscribe-services/auth-consumer-services 

import express from 'express';
import bodyParser from 'body-parser';
import consumeQueueAndPostToDatabase from './Subscriber/login-subscribe.js'

const app = express();
const port = 3002;
app.use(bodyParser.json());
consumeQueueAndPostToDatabase();
app.listen(port, () => {
  console.log(`Auth subscribe service is running on port ${port}`);
});
