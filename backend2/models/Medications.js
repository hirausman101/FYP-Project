import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  description: { type: String, required: true },
  notes: [{ type: String }]
});

export default mongoose.models.Item || mongoose.model('medications', medicationSchema);
