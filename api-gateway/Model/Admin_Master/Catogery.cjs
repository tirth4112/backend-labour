const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createdon: {
    type: Date,
    default: Date.now
  },
  updatedby: {
    type: mongoose.Schema.Types.ObjectId,
  },
  updatedon: {
    type: Date,
    default: Date.now
  },
  deletedby: {
    type: mongoose.Schema.Types.ObjectId
  },
  deletedon: {
    type: Date
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
