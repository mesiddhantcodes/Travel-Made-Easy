const mongoose = require('mongoose');
const busSchema = new mongoose.Schema({

    busNumber: {
        type: String,
        required: true,
        trim: true,
        enum: ['B1', 'B2', 'B3', 'K1','K2','K3','R1','R2','R3']
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true,
        trim: true,
        minlength: 3
    },
    // driver id 
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
        trim: true
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