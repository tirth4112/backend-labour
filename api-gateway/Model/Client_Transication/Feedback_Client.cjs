const mongoose = require('mongoose');

const feedback_Client_Schema = new mongoose.Schema({
  randam_id: {
    type: String,
    required: true
  },
  feedback_description: {
    type: String,
    required: true
  },
  current_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  receivinguser_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userdetail_Client', // Assuming you have a User model to reference
    required: true
  }
});

const Feedback = mongoose.model('Feedback', feedback_Client_Schema);

module.exports = Feedback;
