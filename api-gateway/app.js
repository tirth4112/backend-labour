
import express from 'express';
import bodyParser from 'body-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';


const app = express();
const port = 3000;

app.use(bodyParser.json());

const authProxy = createProxyMiddleware('', {
  target: 'http://localhost:3001',
  changeOrigin: true,
  onError: (err, req, res) => {
    // console.error('Auth Proxy Error:');
    res.status(500).send('Auth Proxy Error');
  },
});

const registrationProxy = createProxyMiddleware('/register', {
  target: 'http://localhost:3002',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error('Registration Proxy Error:', err);
    res.status(500).send('Registration Proxy Error');
  },
});

const employeeProxy = createProxyMiddleware('/employees', {
  target: 'http://localhost:3003',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error('Employee Proxy Error:', err);
    res.status(500).send('Employee Proxy Error');
  },
});

app.use(authProxy);
app.use(registrationProxy);
app.use(employeeProxy);



app.listen(port, () => {
  console.log(`Main server is running on port ${port}`);
});