const mongoose = require('mongoose');
const busSchema = new mongoose.Schema({

    busNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true,
        trim: true,
        minlength: 3
    },
    driverPhoneNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    busRoute: {
        type: Object,
        required: true,
        trim: true,
        default: { startLocation: 0, endLocation: 0 }
    },
    busCapacity: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    busStatus: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },


    location: {
        type: Object,
        required: false,
        trim: true,
        default: { lat: 0, lng: 0 }
    }
});



module.exports = mongoose.model('Bus', busSchema);