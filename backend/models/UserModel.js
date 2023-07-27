const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirm_password: { type: String },
  resetToken: { type: String },
  resetTokenExpiration: { type: String },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role', // 'Role' should match the model name for the Role collection
    default: null // default value for the field (optional)
  },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Designation',
  },
  image: {
    type: String,
    default: null

  },
  present_address: {
    type: String,
    default: null
  },
  permanent_address: {
    type: String,
    default: null
  }
  ,
  isVerified: {
    type: Boolean,
    default: true // default value for the field (optional)
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
