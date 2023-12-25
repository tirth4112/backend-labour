// cd backend-labour/publish-services/auth-service 
const express = require('express');
const bodyParser = require('body-parser');
// Change the file name from Check_Admin.js to Check_Admin.cjs
const middleware_Admin = require('../../api-gateway/middleware/Check_Admin.cjs');
const Auth_Registration=require('./controllers/Admin_Registration_Controller')
const Auth_Login=require('./controllers/Admin_Login_Controller')
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/Admin-Registration',
// ,middleware_Admin.CheckAdmin,
Auth_Registration.Registeration);

app.post('/Admin-Login', Auth_Login.Admin_Login_Controller);

app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
});
