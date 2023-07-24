const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirm_password: { type: String},
  resetToken:{type:String},
  resetTokenExpiration:{type:String},
  role:{type:String,default:'User'},
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
