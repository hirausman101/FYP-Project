import mongoose from 'mongoose';

const dosageSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  dosage_amount: { type: String, required: true },
  frequency: { type: String, required: true },
  timing: [{ type: String, required: true }],
  medication_id: { type: mongoose.Schema.Types.ObjectId, ref: 'medications', required: true }
});

export default mongoose.models.Item || mongoose.model('dosages', dosageSchema);
