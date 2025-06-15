const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    patient_id: mongoose.Schema.ObjectId,
    caregiver_id: mongoose.Schema.ObjectId,
    content: String,
    timestamp: {type: Date, default: Date.now },

});

module.exports = mongoose.model('Note', noteSchema);
