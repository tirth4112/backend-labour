import { createProxyMiddleware } from 'http-proxy-middleware';

const authProxy = createProxyMiddleware('/', {
  target: 'http://localhost:3001',
  changeOrigin: true,
  timeout: 600000,  // Set timeout to 10 minutes (adjust as needed)

  onError: (err, req, res) => {
    console.error('Auth Proxy Error:', err);
    res.status(500).send('Auth Connection Error');
  },
});

export default authProxy;
