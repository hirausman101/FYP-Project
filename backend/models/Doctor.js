const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hospital: { type: String, required: true },
});

module.exports = mongoose.model('doctors', doctorSchema);