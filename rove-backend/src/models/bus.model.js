const mongoose = require('mongoose');
const busSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  chesiNumber: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  license: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  from: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },

  to: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  route: {
    type: Array,
    required: false,
    default: [],
  },
});

module.exports = mongoose.model('Bus', busSchema);
