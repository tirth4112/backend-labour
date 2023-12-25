const mongoose = require('mongoose');

const Admin_password = new mongoose.Schema({
  
 
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail-Admin', required: true },

  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Admin_PasswordChange = mongoose.model('Admin_PasswordChange', Admin_password);

module.exports = Admin_PasswordChange;
