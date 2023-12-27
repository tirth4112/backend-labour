import { createProxyMiddleware } from 'http-proxy-middleware';

const employeeProxy = createProxyMiddleware('/employees', {
  target: 'http://localhost:3003',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error('Employee Proxy Error:', err);
    res.status(500).send('Employee Proxy Error');
  },
});

export default employeeProxy;
