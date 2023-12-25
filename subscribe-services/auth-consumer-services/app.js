// cd backend-labour/subscribe-services/auth-consumer-services 

import express from 'express';
import bodyParser from 'body-parser';
// import consumeQueueAndPostToDatabase from './Subscriber/login-subscribe.js'
// import Admin_Login_Successful_subscribe from './Subscriber/Admin_Login_Successful_subscribe.js'
// import Admin_Login_unSuccessful_subscribe from './Subscriber/Admin_Login_unSuccessful_subscribe.js'
import CallingSubscribe from '../auth-consumer-services/CallingSubscribe.js'
const app = express();
const port = 3002;
app.use(bodyParser.json());
CallingSubscribe();
// consumeQueueAndPostToDatabase();
// Admin_Login_Successful_subscribe()
app.listen(port, () => {
  console.log(`Auth subscribe service is running on port ${port}`);
});
