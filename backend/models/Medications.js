const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  description: { type: String, required: true },
  notes: [{ type: String }]
});

module.exports = mongoose.model('medications', medicationSchema);