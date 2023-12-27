
import express from 'express';
import bodyParser from 'body-parser';
import authProxy from './ProxyNetworks/AuthProxy.js'
import registrationProxy from './ProxyNetworks/RegistrationProxy.js';
import employeeProxy from './ProxyNetworks/EmployeeProxy.js';
const app = express();
const port = 3000;

app.use(bodyParser.json());



app.use(authProxy);
app.use(registrationProxy);
app.use(employeeProxy);


app.listen(port, () => {
  console.log(`Main server is running on port ${port}`);
});