import dbConnect from './_dbConnect.js';
import Item from '../models/Item.js';
import User from '../models/User.js';
import Note from '../models/Note.js';
import Location from '../models/location.js';
import Doctor from '../models/Doctor.js';
import Tremors from '../models/Tremors.js';
import Medication from '../models/Medications.js';
import Dosage from '../models/Dosage.js';
import DosageStatus from '../models/DosageStatus.js';
import Notification from '../models/Notifications.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Helper: CORS
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

// Helper: JWT protect
async function protect(req, res) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Not authorized, no token' });
    return false;
  }
  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    return true;
  } catch {
    res.status(401).json({ error: 'Not authorized, token failed' });
    return false;
  }
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  await dbConnect();
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);

  // Root
  if (pathname === '/' || pathname === '/api') {
    return res.status(200).send('Hello from API handler');
  }

  // Items
  if (pathname === '/api/items') {
    if (req.method === 'GET') {
      const items = await Item.find();
      return res.status(200).json(items);
    }
  }

  // Notifications
  if (pathname === '/api/notifications' && req.method === 'GET') {
    const notifications = await Notification.find();
    const formatted = notifications.map(n => ({
      ...n._doc,
      Time: new Date(n.Time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    }));
    return res.status(200).json(formatted);
  }

  // Images
  if (pathname === '/api/images' && req.method === 'GET') {
    const images = await Image.find();
    if (!images.length) return res.status(404).json({ message: 'No images found' });
    const imageData = images.map(image => ({
      name: image.name,
      data: image.data.toString('base64'),
      contentType: image.contentType,
    }));
    return res.status(200).json(imageData);
  }
  if (pathname.startsWith('/api/images/') && req.method === 'GET') {
    const id = pathname.split('/').pop();
    const image = await Image.findById(id);
    if (!image) return res.status(404).send('Image not found');
    res.setHeader('Content-Type', image.contentType);
    return res.end(image.data);
  }

  // Patient Data (dynamic)
  if (pathname.startsWith('/api/patientData/')) {
    if (req.method === 'GET') {
      const id = pathname.split('/').pop();
      const patient = await Patient.findById(id)
        .populate('doctorInformation')
        .populate({ path: 'dosageInformation', populate: { path: 'medication_id' } })
        .populate('tremorsInformation');
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      return res.status(200).json(patient);
    }
  }

  // Tremors (dynamic)
  if (pathname.startsWith('/api/tremors/')) {
    if (req.method === 'GET') {
      const id = pathname.split('/').pop();
      const tremor = await Tremors.findById(id);
      if (!tremor) return res.status(404).json({ message: 'Tremor data not found' });
      return res.status(200).json(tremor);
    }
  }

  // Dosages
  if (pathname === '/api/dosages' && req.method === 'GET') {
    const dosage = await Dosage.find().populate('medication_id');
    return res.status(200).json(dosage);
  }

  // Dosage Status (dynamic)
  if (pathname.startsWith('/api/dosage_status/')) {
    if (req.method === 'GET') {
      const patientId = pathname.split('/').pop();
      const statuses = await DosageStatus.find({ patient_id: patientId })
        .populate('dosage_id')
        .populate({ path: 'dosage_id', populate: { path: 'medication_id' } });
      return res.status(200).json(statuses);
    }
  }

  // Medications
  if (pathname === '/api/medications') {
    if (req.method === 'GET') {
      const medication = await Medication.find();
      return res.status(200).json(medication);
    }
    if (req.method === 'POST') {
      if (!(await protect(req, res))) return;
      const { name, class: medClass, description, notes } = req.body;
      const medication = new Medication({ name, class: medClass, description, notes });
      await medication.save();
      return res.status(201).json(medication);
    }
  }

  // POST /api/dosages
  if (pathname === '/api/dosages' && req.method === 'POST') {
    if (!(await protect(req, res))) return;
    const { dosage_amount, frequency, timing, medication_id } = req.body;
    const dosage = new Dosage({ dosage_amount, frequency, timing, medication_id });
    await dosage.save();
    return res.status(201).json(dosage);
  }

  // POST /api/medications_with_dosage
  if (pathname === '/api/medications_with_dosage' && req.method === 'POST') {
    if (!(await protect(req, res))) return;
    const { medication, dosage, patientId } = req.body;
    const newMedication = new Medication(medication);
    await newMedication.save();
    const newDosage = new Dosage({ ...dosage, medication_id: newMedication._id });
    await newDosage.save();
    await Patient.findByIdAndUpdate(patientId, { $push: { dosageInformation: newDosage._id } }, { new: true });
    const newDosageStatus = new DosageStatus({
      dosage_id: newDosage._id,
      patient_id: patientId,
      statuses: (Array.isArray(newDosage.timing) ? newDosage.timing : [newDosage.timing]).map(t => ({ timing: t, status: '-' }))
    });
    await newDosageStatus.save();
    return res.status(201).json({ medication: newMedication, dosage: newDosage, dosageStatus: newDosageStatus });
  }

  // POST /api/add_timing_to_dosage
  if (pathname === '/api/add_timing_to_dosage' && req.method === 'POST') {
    if (!(await protect(req, res))) return;
    const { dosageId, timing, patientId } = req.body;
    const updatedDosage = await Dosage.findByIdAndUpdate(
      dosageId, { $addToSet: { timing } }, { new: true }
    );
    const updatedDosageStatus = await DosageStatus.findOneAndUpdate(
      { dosage_id: dosageId, patient_id: patientId },
      { $addToSet: { statuses: { timing, status: 'null' } } }, { new: true }
    );
    return res.status(200).json({ message: 'Timing added', dosage: updatedDosage, dosageStatus: updatedDosageStatus });
  }

  // PUT /api/update_timing_in_dosage
  if (pathname === '/api/update_timing_in_dosage' && req.method === 'PUT') {
    if (!(await protect(req, res))) return;
    const { dosage_id, oldTiming, newTiming, patientId } = req.body;
    await Dosage.updateOne({ _id: dosage_id, timing: oldTiming }, { $set: { "timing.$": newTiming } });
    await DosageStatus.updateOne(
      { dosage_id, patient_id: patientId, "statuses.timing": oldTiming },
      { $set: { "statuses.$.timing": newTiming } }
    );
    return res.status(200).json({ message: 'Timing updated successfully' });
  }

  // POST /api/add_dosage_for_existing_medication
  if (pathname === '/api/add_dosage_for_existing_medication' && req.method === 'POST') {
    if (!(await protect(req, res))) return;
    try {
      const { medicationId, dosage, patientId } = req.body;
      // dosage: { dosage_amount, frequency, timing: [ ... ] }

      // 1. Try to find an existing dosage for this medication, amount, frequency
      let existingDosage = await Dosage.findOne({
        medication_id: medicationId,
        dosage_amount: dosage.dosage_amount,
        frequency: dosage.frequency,
      });

      let dosageId;
      if (existingDosage) {
        // 2. Add new timing(s) to the existing dosage (avoid duplicates)
        const newTimings = (Array.isArray(dosage.timing) ? dosage.timing : [dosage.timing]).filter(
          t => !existingDosage.timing.includes(t)
        );
        if (newTimings.length > 0) {
          existingDosage.timing.push(...newTimings);
          await existingDosage.save();
        }
        dosageId = existingDosage._id;
      } else {
        // 3. Create a new dosage
        const newDosage = new Dosage({
          ...dosage,
          medication_id: medicationId
        });
        await newDosage.save();
        dosageId = newDosage._id;
      }

      // 4. Add dosage to patient's dosageInformation array
      await Patient.findByIdAndUpdate(
        patientId,
        { $addToSet: { dosageInformation: dosageId } }
      );

      // 5. Update or create DosageStatus for this patient and dosage
      let dosageStatus = await DosageStatus.findOne({
        dosage_id: dosageId,
        patient_id: patientId
      });
      if (!dosageStatus) {
        dosageStatus = new DosageStatus({
          dosage_id: dosageId,
          patient_id: patientId,
          statuses: (Array.isArray(dosage.timing) ? dosage.timing : [dosage.timing]).map(t => ({
            timing: t,
            status: 'null'
          }))
        });
        await dosageStatus.save();
      } else {
        // Add new timings to statuses if not already present
        const existingTimings = dosageStatus.statuses.map(s => s.timing);
        const newStatusObjs = (Array.isArray(dosage.timing) ? dosage.timing : [dosage.timing])
          .filter(t => !existingTimings.includes(t))
          .map(t => ({ timing: t, status: '-' }));
        if (newStatusObjs.length > 0) {
          dosageStatus.statuses.push(...newStatusObjs);
          await dosageStatus.save();
        }
      }

      return res.status(201).json({
        message: existingDosage ? 'Timing added to existing dosage' : 'New dosage created',
        dosageId,
        dosageStatus
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error adding dosage for existing medication', error: error.message });
    }
  }

  // DELETE /api/dosage_status/remove_timing
  if (pathname === '/api/dosage_status/remove_timing' && req.method === 'DELETE') {
    if (!(await protect(req, res))) return;
    try {
      const { dosage_id, timing } = req.body;

      // 1. Remove the status object with the given timing from all matching dosage_status docs
      const result = await DosageStatus.updateMany(
        { dosage_id },
        { $pull: { statuses: { timing } } }
      );

      // 2. Remove the timing from the Dosage document's timing array
      await Dosage.findByIdAndUpdate(
        dosage_id,
        { $pull: { timing: timing } }
      );

      // 3. After removal, check if any DosageStatus docs for this dosage_id have empty statuses
      const dosageStatuses = await DosageStatus.find({ dosage_id });
      for (const ds of dosageStatuses) {
        if (!ds.statuses || ds.statuses.length === 0) {
          // Remove DosageStatus
          await DosageStatus.deleteOne({ _id: ds._id });
          // Remove Dosage
          await Dosage.findByIdAndDelete(dosage_id);
          // Remove dosage from patient's dosageInformation array
          await Patient.findByIdAndUpdate(
            ds.patient_id,
            { $pull: { dosageInformation: dosage_id } }
          );
        }
      }

      return res.status(200).json({ message: 'Timing removed from dosage status and dosage (and dosage deleted if last timing)', result });
    } catch (error) {
      return res.status(500).json({ message: 'Error removing timing from dosage status', error: error.message });
    }
  }

  // PUT /api/dosages/:id
  if (pathname.startsWith('/api/dosages/') && req.method === 'PUT') {
    if (!(await protect(req, res))) return;
    const id = pathname.split('/').pop();
    const { dosage_amount, timing } = req.body;
    const dosage = await Dosage.findByIdAndUpdate(id, { dosage_amount, timing }, { new: true });
    if (!dosage) return res.status(404).json({ message: 'Dosage not found' });
    return res.status(200).json(dosage);
  }

  // GET /api/location/:patientId
  if (pathname.startsWith('/api/location/') && req.method === 'GET') {
    if (!(await protect(req, res))) return;
    const patientId = pathname.split('/').pop();
    const location = await Location.findOne({ patient_id: patientId }).sort({ updatedAt: -1 });
    if (!location) return res.status(404).json({ message: 'No location found' });
    return res.status(200).json(location);
  }

  // Auth: Register
  if (pathname === '/api/register' && req.method === 'POST') {
    const { name, email, password } = req.body;
    const userType = "Caregiver";
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Password must contain at least one digit, one uppercase letter, one lowercase letter, and be at least 6 characters long." });
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(400).json({ error: "User already exists!!" });
    const newUser = new User({ name, email, password, userType });
    await newUser.save();
    return res.status(200).json({ status: "ok", data: "User Created" });
  }

  // Auth: Login
  if (pathname === '/api/login-user' && req.method === 'POST') {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email });
    if (!oldUser) return res.status(404).json({ error: "User doesn't exist!!" });
    const isMatch = await bcrypt.compare(password, oldUser.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    if (!process.env.JWT_SECRET) return res.status(500).json({ error: "Server configuration error" });
    await User.findOneAndUpdate({ email }, { $set: { isAvailable: true } }, { new: true });
    const token = jwt.sign({ _id: oldUser._id, email: oldUser.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({ status: "ok", data: token, userType: oldUser.userType, id: oldUser._id, name: oldUser.name, email: oldUser.email });
  }

  // GET /api/patient-items
  if (pathname === '/api/patient-items' && req.method === 'GET') {
    if (!(await protect(req, res))) return;
    const { email, id } = Object.fromEntries(searchParams.entries());
    if (!email || !id) return res.status(400).json({ error: 'Email and id are required' });
    const user = await User.findOne({ email, _id: id }).populate('items_id');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ items: user.items_id });
  }

  // GET /api/get-all-user
  if (pathname === '/api/get-all-user' && req.method === 'GET') {
    const data = await User.find({});
    return res.status(200).json({ status: "ok", data });
  }

  // POST /api/delete-user
  if (pathname === '/api/delete-user' && req.method === 'POST') {
    const { id } = req.body;
    const deletedUser = await User.deleteOne({ _id: id });
    if (deletedUser.deletedCount === 0) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ status: "ok", data: "User Deleted" });
  }

  // POST /api/forgot-password
  if (pathname === '/api/forgot-password' && req.method === 'POST') {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.passwordResetCode = resetCode;
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    await user.save();
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${resetCode}\n\nIt will expire in 15 minutes.`,
      html: `<p>Your password reset code is: <b>${resetCode}</b></p><p>It will expire in 15 minutes.</p>`
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ status: "ok", message: "Password reset code sent" });
  }

  // POST /api/reset-password
  if (pathname === '/api/reset-password' && req.method === 'POST') {
    const { email, code, newPassword } = req.body;
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ error: "Password must contain at least one digit, one uppercase letter, one lowercase letter, and be at least 6 characters long." });
    }
    const user = await User.findOne({
      email,
      passwordResetCode: code,
      passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) {
      await User.updateOne({ email }, { $unset: { passwordResetCode: "", passwordResetExpires: "" } });
      return res.status(400).json({ error: "Invalid or expired code." });
    }
    user.password = newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Password reset successful!" });
  }

  // GET/PUT/DELETE /api/profile
  if (pathname === '/api/profile') {
    if (!(await protect(req, res))) return;
    if (req.method === 'GET') {
      const { email, id } = Object.fromEntries(searchParams.entries());
      if (!email || !id) return res.status(400).json({ error: "Email and id are required" });
      const user = await User.findOne({ email, _id: id }).populate('items_id');
      if (!user) return res.status(404).json({ error: "User not found" });
      const { password, ...userWithoutPassword } = user.toObject();
      return res.status(200).json({ status: "ok", data: userWithoutPassword });
    }
    if (req.method === 'PUT') {
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const updateFields = {};
      if (req.body.name !== undefined) updateFields.name = req.body.name;
      if (req.body.mobile !== undefined) updateFields.mobile = req.body.mobile;
      if (req.body.gender !== undefined) updateFields.gender = req.body.gender;
      if (req.body.profession !== undefined) updateFields.profession = req.body.profession;
      if (req.body.isAvailable !== undefined) updateFields.isAvailable = req.body.isAvailable;
      const user = await User.findByIdAndUpdate(decoded._id, updateFields, { new: true });
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.status(200).json({ status: "ok", data: user });
    }
    if (req.method === 'DELETE') {
      const id = searchParams.get('id');
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.status(200).json({ status: "ok" });
    }
  }

  // Notes
  if (pathname === '/api/notes') {
    if (req.method === 'POST') {
      const { content, patient_id, caregiver_id } = req.body;
      if (!content || !patient_id || !caregiver_id) {
        return res.status(400).json({ error: 'content, patientId, and caregiverId are required' });
      }
      const note = new Note({ content, patient_id, caregiver_id });
      const saved = await note.save();
      return res.status(200).json(saved);
    }
  }
  if (pathname.startsWith('/api/notes/')) {
    const id = pathname.split('/').pop();
    if (req.method === 'GET') {
      const notes = await Note.find({ patient_id: id });
      return res.status(200).json(notes);
    }
    if (req.method === 'PUT') {
      const updated = await Note.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(updated);
    }
    if (req.method === 'DELETE') {
      await Note.findByIdAndDelete(id);
      return res.status(200).json({ message: 'deleted' });
    }
  }

  // Fallback
  return res.status(404).json({ error: 'Route not found' });
}