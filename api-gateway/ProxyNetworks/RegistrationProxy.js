import { createProxyMiddleware } from 'http-proxy-middleware';

const registrationProxy = createProxyMiddleware('/registration', {
  target: 'http://localhost:3002',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error('Registration Proxy Error:', err);
    res.status(500).send('Registration Proxy Error');
  },
});

export default registrationProxy;
