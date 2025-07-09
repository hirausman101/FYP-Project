import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hospital: { type: String, required: true },
});

export default mongoose.models.Item || mongoose.model('doctors', doctorSchema);
