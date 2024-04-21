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
  },
  busNumber: {
    type: String,
    required: true,
    trim: true,
  },
  license: {
    type: String,
    required: true,
    trim: true,
  },
  capacity: {
    type: Number,
    required: true,
    default: 0,
  },

  route: {
    type: String,
    required: false,
  
  },
});

module.exports = mongoose.model('Bus', busSchema);
