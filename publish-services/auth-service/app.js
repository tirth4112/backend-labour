// cd backend-labour/publish-services/auth-service 
const express = require('express');
const bodyParser = require('body-parser');


const post=require('./routes/post');
const get=require('./routes/get');

// // Change the file name from Check_Admin.js to Check_Admin.cjs
// const middleware_Admin = require('../../api-gateway/middleware/Check_Admin.cjs');
// const Auth_Registration=require('./controllers/Admin_Registration_Controller')
// const Auth_Login=require('./controllers/Admin_Login_Controller')
// const Admin_ForgetPassword=require('./controllers/Admin_ForgetPassword')
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use("/post",post);
app.use("/get",get);

// app.post('/Admin-Registration',
// Auth_Registration.Registeration);

// app.post('/Admin-Login', Auth_Login.Admin_Login_Controller);
// app.post('/Admin-ForgetPassword', Admin_ForgetPassword.Admin_ForgetPassword);

app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
});
