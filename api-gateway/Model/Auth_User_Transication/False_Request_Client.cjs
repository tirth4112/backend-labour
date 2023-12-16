const mongoose = require('mongoose');

const falseLoginLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userdetail_CLient', // Assuming you have a User model to reference
    required: true
    
  },
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

const FalseLoginLog = mongoose.model('False_Request_Client', falseLoginLogSchema);

module.exports = FalseLoginLog;
