// cd backend-labour/publish-services/auth-service 
const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const Auth_Registration=require('./controllers/Admin_Registration_Controller')
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/login', authController.login);
app.post('/Admin-Registration', Auth_Registration.Registeration);

app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
});
