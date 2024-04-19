const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');

const userSchema = mongoose.Schema(
  {
   
    name: {
      type: String,
      required: true,

      trim: true,
    },
    year: {
      type: Number,

      trim: true,
    },
    branch: {
      type: String,

      trim: true,
    },
    roll: {
      type: String,

      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    course: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,

      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      required: true,
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    //stoppage is lat long and name
    stoppage:  {
      type: [
        {
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
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// stoppage is lat long convert them to geojson
userSchema.virtual('stoppage.geojson').get(function () {
  return {
    type: 'Point',
    coordinates: [this.stoppage.location.lat, this.stoppage.location.long],
  };
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
