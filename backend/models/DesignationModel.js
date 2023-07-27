const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Designation = mongoose.model('Designation', roleSchema);

module.exports = Designation;
