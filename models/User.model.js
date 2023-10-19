const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    collegeId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    branch: {
        type: String,
        required: true,
        trim: true,
        enum : ['CSE','EE','EC','IT']
    },
    year: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4']
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },


});

module.exports = mongoose.model('User', userSchema);
