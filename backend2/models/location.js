import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patientData', required: true }
},);;


export default mongoose.models.Item || mongoose.model('locations', locationSchema);
