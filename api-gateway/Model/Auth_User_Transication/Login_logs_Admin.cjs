const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
 
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userdetail_Admin', // Assuming you have a User model to reference
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  success: {
    type: Boolean,
    required: true,
    default:false
  }
});

const LoginLog = mongoose.model('Login_Log_Admin', loginLogSchema);

module.exports = LoginLog;
