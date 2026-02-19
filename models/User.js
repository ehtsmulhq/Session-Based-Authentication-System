const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true }
});

module.exports = mongoose.model('User', userSchema);
