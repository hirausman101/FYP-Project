const mongoose = require('mongoose');

const tremorsSchema = new mongoose.Schema({
  values: [{ y: Number }]
});

module.exports = mongoose.model('tremors', tremorsSchema);