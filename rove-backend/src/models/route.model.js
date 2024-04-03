const mongoose = require('mongoose');
const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  stoppages: {
    type: [
      {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 3,
        },
        location: {
         
            type: String,
            required: true,
        },
      },
    ],
    required: false,
    default: [],
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
  },
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
