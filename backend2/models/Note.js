import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    patient_id: mongoose.Schema.ObjectId,
    caregiver_id: mongoose.Schema.ObjectId,
    content: String,
    timestamp: {type: Date, default: Date.now },

});

export default mongoose.models.Item || mongoose.model('notes', noteSchema);

