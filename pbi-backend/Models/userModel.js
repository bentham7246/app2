const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'name is required!'],
      maxlength: [20, 'Length must be less than or equal to 20'],
      minlength: [3, 'Length must be greater than or equal 3 characters'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email address!']
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      minlength: [8, 'Password must be greater or equal 8 character'],
      select: false
    },
  },
  
);

const User = mongoose.model('User', userSchema);

module.exports = User;
