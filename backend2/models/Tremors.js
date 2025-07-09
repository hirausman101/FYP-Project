import mongoose from 'mongoose';

const tremorsSchema = new mongoose.Schema({
  values: [{ y: Number }]
});

export default mongoose.models.Item || mongoose.model('tremors', tremorsSchema);
