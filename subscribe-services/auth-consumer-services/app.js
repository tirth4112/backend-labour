// cd backend-labour/subscribe-services/auth-consumer-services 

import express from 'express';
import bodyParser from 'body-parser';
import CallingSubscribe from '../auth-consumer-services/CallingSubscribe.js'
const app = express();
const port = 3002;
app.use(bodyParser.json());
CallingSubscribe();
app.listen(port, () => {
  console.log(`Auth subscribe service is running on port ${port}`);
});
