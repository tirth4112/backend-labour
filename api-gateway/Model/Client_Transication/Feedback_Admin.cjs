const mongoose = require('mongoose');

const feedback_Admin_Schema = new mongoose.Schema({
  randam_id: {
    type: String,
    required: true
  },
  feedback_Response: {
    type: String,
    required: true
  },
  current_date: {
    type: Date,
    default: Date.now,
    required: true
  },
   User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userdetail_Admin', // Assuming you have a User model to reference
    required: true
  },
  Feedback_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback_Client', // Assuming you have a User model to reference
    required: true
  }
});

const Feedback_Admin_Schema = mongoose.model('Feedback', feedback_Admin_Schema);

module.exports = Feedback_Admin_Schema;
