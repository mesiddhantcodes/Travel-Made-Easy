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
  busNumber: {
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
  capacity: {
    type: Number,
    required: true,
    default: 0,
  },
  
  route: {  
    type: Array,
    required: false,
    default: [],
  },
});

module.exports = mongoose.model('Bus', busSchema);
