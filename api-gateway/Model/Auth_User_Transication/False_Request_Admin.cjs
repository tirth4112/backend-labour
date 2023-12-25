const mongoose = require('mongoose');

const falseLoginLogSchema = new mongoose.Schema({
  
 
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail-Admin', required: true },

  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  failedAttempts: {
    type: Number,
    default: 1,
    required: true
  }
});

const FalseLoginLog = mongoose.model('False_Request_Admin', falseLoginLogSchema);

module.exports = FalseLoginLog;
