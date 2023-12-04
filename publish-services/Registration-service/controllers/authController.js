// auth-service/controllers/authController.js
const User = require('../models/User');

exports.login = (req, res) => {
  const user = new User(req.body.username, req.body.password);
  res.json({ message: 'Login successful', user });
};
