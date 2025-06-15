const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patientData', required: true }
},);;


const Location = mongoose.model('locations', locationSchema);

module.exports = Location;