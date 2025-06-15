const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    patient_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true},
    Name: { type: String, required: true },
    Gender: { type: String, required: true },
    Status: { type: String, required: true },
});

const Item = mongoose.model('items', itemSchema);

module.exports = Item;