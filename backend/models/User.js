const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");




const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: String,
  mobile: String,
  gender: String,
  profession: String,
  passwordResetCode: String, 
  passwordResetExpires: Date, 
  isAvailable: { type: Boolean, default: true },
  items_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'items' }], 
});


// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  console.log("Pre-save hook running"); // <-- Add this
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Match password
userSchema.methods.matchPassword = function(password) {
  return bcrypt.compare(password, this.password);
};


const User = mongoose.model('users', userSchema);
module.exports = User;