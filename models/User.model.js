const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    collegeId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    branch: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    year: {
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
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },

});

module.exports= mongoose.model('User', userSchema);
