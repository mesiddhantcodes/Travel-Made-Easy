const mongoose = require('mongoose');
const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  stoppages: [
   
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
          lat: {
            type: Number,
            required: true,
          },
          long: {
            type: Number,
            required: true,
          },
        }
      }
 
  ],
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
  },
});

routeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

routeSchema.virtual("stoppages.geojson").get(function () {
  return this.stoppages.map((stoppage) => {
    return {
      type: 'Point',
      coordinates: [stoppage.location.lat, stoppage.location.long],
    };
  });
});


const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
