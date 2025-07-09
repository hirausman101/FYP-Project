import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  relation: String,
});



const patientSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Stable', 'Critical', 'Recovering', 'Deceased'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  emergencyContact: {
    type: emergencyContactSchema,
    required: true
  },
  doctorInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctors',
    required: true,
  },
  dosageInformation: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dosages',
    required: true
  }],
  tremorsInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tremors',
    required: false
  },
}, { collection: 'patientData' });

export default mongoose.models.Item || mongoose.model('patientData', patientSchema);
