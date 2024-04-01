const mongoose = require('mongoose');
const driverSchema = new mongoose.Schema({
    driverName: {
        type: String,
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
    driverAddress: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    licenseNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    licenseExpiryDate: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    busAssigned: {
        type: mongoose.Schema.Types.ObjectId,
        
        ref:'Bus',
    },
    location: {
        type: Object,
        required: false,
        trim: true,
        default: { lat: 0, lng: 0 }
    }




});
module.exports = mongoose.model('Driver', driverSchema);

