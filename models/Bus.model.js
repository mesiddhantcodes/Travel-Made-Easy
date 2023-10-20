const mongoose = require('mongoose');
const busSchema = new mongoose.Schema({

    // write the schema for bus 
    busNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    busCapacity: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    busType: {
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
    busLocation: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    busDriver: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
});



module.exports = mongoose.model('Bus', busSchema);