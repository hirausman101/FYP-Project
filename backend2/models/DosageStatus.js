import mongoose from 'mongoose';

const dosageStatusSchema = new mongoose.Schema({
  dosage_id: { type: mongoose.Schema.Types.ObjectId, ref: 'dosages', required: true },
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patientData', required: true },
  statuses: [
    {
      timing: { type: String, required: true },
      status: { type: String, enum: ['Taken', 'Missed', 'null'], required: true }
    }
  ]
});

export default mongoose.models.Item || mongoose.model('dosageStatus', dosageStatusSchema);
