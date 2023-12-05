// auth-service/app.js
const express = require('express');
const bodyParser = require('body-parser');
const consumeQueueAndPostToDatabase=require('./Subscriber/login-subscribe')
const app = express();
const port = 3002;
app.use(bodyParser.json());
consumeQueueAndPostToDatabase();
app.listen(port, () => {
  console.log(`Auth subscribe service is running on port ${port}`);
});
