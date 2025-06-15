const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
dotenv.config();


// Import your User model and protect middleware
const Item = require('./models/Item');
const User = require('./models/User'); // <-- Import User model
const protect = require('./middleware/authMiddleware'); // <-- Import protect middleware
const Note = require('./models/Note'); // Import Note model
const Location=require('./models/location');
const Doctor = require('./models/Doctor');
const Tremors = require('./models/Tremors');
const Medication = require('./models/Medication');
const Dosage = require('./models/Dosage');
const DosageStatus = require('./models/DosageStatus');
const Patient = require('./models/Patient');
const Image = require('./models/Image');



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// Load environment variables
dotenv.config();

// Create the express app
const app = express();

// CORS setup for localhost
app.use(cors({
    origin: 'http://localhost:8081', 
}));

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB');
})
.catch((err) => {
    console.log('❌ Error connecting to MongoDB:', err);
});

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Image model schema
const imageSchema = new mongoose.Schema({
  data: Buffer,         
  contentType: String, 
  name: String, 
});

const Image = mongoose.model('Image', imageSchema);

// Upload image route
app.post('/images', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newImage = new Image({
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err });
  }
});

// Fetch image by ID route
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();

    if (!images || images.length === 0) {
      console.log('No images found');
      return res.status(404).json({ message: 'No images found' });
    }

    // Map the images to include name and buffer data
    const imageData = images.map(image => ({
      name: image.name,
      data: image.data.toString('base64'), // Convert buffer to base64 string
      contentType: image.contentType,
    }));

    res.json(imageData);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).json({ message: 'Error fetching images', error: err });
  }
});


app.get('/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', image.contentType); // Set the correct image MIME type
    res.send(image.data); // Send the raw image data to the client
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).send('Error fetching image');
  }
});






// Get all items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
});






// Get all notifications
app.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find();
        const formattedNotifications = notifications.map(n => ({
            ...n._doc,
            Time: new Date(n.Time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        }));
        res.json(formattedNotifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
});




// Fetch a single patient by ID
app.get('/patientData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id)
      .populate('doctorInformation')
      .populate({
        path: 'dosageInformation',
        populate: { path: 'medication_id' }
      })
      .populate('tremorsInformation');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error });
  }
});
app.get('/tremors/:id', async (req, res) => {
  try {
    const tremor = await Tremors.findById(req.params.id);
    if (!tremor) {
      return res.status(404).json({ message: 'Tremor data not found' });
    }
    res.json(tremor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tremor data', error });
  }
});

app.get('/dosages', async (req, res) => {
  try {
    const dosage = await Dosage.find().populate('medication_id');
    res.json(dosage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dosages', error });
  }
});


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

const DosageStatus = mongoose.model('dosageStatus', dosageStatusSchema,'dosageStatus');


app.get('/dosage_status/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const statuses = await DosageStatus.find({ patient_id: new mongoose.Types.ObjectId(patientId) })  
     .populate('dosage_id')
      .populate({
        path: 'dosage_id',
        populate: { path: 'medication_id' }
      });
    res.json(statuses);
  } catch (error) {
    console.error('Error fetching dosage status:', error); // <-- Add this line
    res.status(500).json({ message: 'Error fetching dosage status', error: error.message });
  }
});

app.get('/medications', async (req, res) => {
  try {
    const medication = await Medication.find();
    res.json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dosages', error });
  }
});


app.post('/medications', protect, async (req, res) => {
  try {
    const { name, class: medClass, description, notes } = req.body;
    const medication = new Medication({ name, class: medClass, description, notes });
    await medication.save();
    res.status(201).json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Error adding medication', error });
  }
});

app.post('/dosages', protect, async (req, res) => {
  try {
    const { dosage_amount, frequency, timing, medication_id } = req.body;
    const dosage = new Dosage({ dosage_amount, frequency, timing, medication_id });
    await dosage.save();
    res.status(201).json(dosage);
  } catch (error) {
    res.status(500).json({ message: 'Error adding dosage', error });
  }
});


app.post('/medications_with_dosage', protect, async (req, res) => {
  try {
    const { medication, dosage, patientId } = req.body;

    // 1. Create medication
    const newMedication = new Medication(medication);
    await newMedication.save();

    // 2. Create dosage linked to new medication
    const newDosage = new Dosage({
      ...dosage,
      medication_id: newMedication._id
    });
    await newDosage.save();

    // 3. Add dosage to patient's dosageInformation array
    await Patient.findByIdAndUpdate(
      patientId,
      { $push: { dosageInformation: newDosage._id } },
      { new: true }
    );

    // 4. Create DosageStatus for this patient and dosage
    const newDosageStatus = new DosageStatus({
      dosage_id: newDosage._id,
      patient_id: patientId,
      statuses: (Array.isArray(newDosage.timing) ? newDosage.timing : [newDosage.timing]).map(t => ({
        timing: t,
        status: '-' // or your default status
      }))
    });
    await newDosageStatus.save();

    res.status(201).json({
      medication: newMedication,
      dosage: newDosage,
      dosageStatus: newDosageStatus
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding medication, dosage, or linking to patient', error });
  }
});


app.post('/add_timing_to_dosage', protect, async (req, res) => {
  try {
    const { dosageId, timing, patientId } = req.body;

    // 1. Add timing to the dosage's timing array (if not already present)
    const updatedDosage = await Dosage.findByIdAndUpdate(
      dosageId,
      { $addToSet: { timing } }, // $addToSet avoids duplicates
      { new: true }
    );

    // 2. Add timing/status to DosageStatus for this patient and dosage
    const updatedDosageStatus = await DosageStatus.findOneAndUpdate(
      { dosage_id: dosageId, patient_id: patientId },
      { $addToSet: { statuses: { timing, status: 'null' } } }, // default status
      { new: true }
    );

    res.json({
      message: 'Timing added to dosage and dosage status',
      dosage: updatedDosage,
      dosageStatus: updatedDosageStatus
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding timing to dosage', error });
  }
});


app.put('/update_timing_in_dosage', protect, async (req, res) => {
  try {
    const { dosage_id, oldTiming, newTiming, patientId } = req.body;

    // Update timing in Dosage
    await Dosage.updateOne(
      { _id: dosage_id, timing: oldTiming },
      { $set: { "timing.$": newTiming } }
    );

    // Update timing in DosageStatus.statuses
    await DosageStatus.updateOne(
      { dosage_id, patient_id: patientId, "statuses.timing": oldTiming },
      { $set: { "statuses.$.timing": newTiming } }
    );

    res.json({ message: 'Timing updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating timing', error });
  }
});


app.post('/add_dosage_for_existing_medication', protect, async (req, res) => {
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

    res.status(201).json({
      message: existingDosage ? 'Timing added to existing dosage' : 'New dosage created',
      dosageId,
      dosageStatus
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding dosage for existing medication', error });
  }
});



app.delete('/dosage_status/remove_timing',  protect, async (req, res) => {
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

    res.json({ message: 'Timing removed from dosage status and dosage (and dosage deleted if last timing)', result });
  } catch (error) {
    res.status(500).json({ message: 'Error removing timing from dosage status', error });
  }
});


app.put('/dosages/:id', protect, async (req, res) => {
  try {
    const { dosage_amount, timing } = req.body;
    const dosage = await Dosage.findByIdAndUpdate(
      req.params.id,
      { dosage_amount, timing },
      { new: true }
    );

    if (!dosage) {
      return res.status(404).json({ message: 'Dosage not found' });
    }
    res.json(dosage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating dosage', error });
  }
});






// Get the latest location for a patient
app.get('/location/:patientId', protect, async (req, res) => {
  try {
    const { patientId } = req.params;
    const location = await Location.findOne({ patient_id: new mongoose.Types.ObjectId(patientId) }).sort({ updatedAt: -1 });
    if (!location) {
      return res.status(404).json({ message: 'No location found for this patient' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location', error });
  }
});



// Register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userType = "Caregiver";
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send({ error: "Password must contain at least one digit, one uppercase letter, one lowercase letter, and be at least 6 characters long." });
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(400).send({ error: "User already exists!!" });
    const newUser = new User({ name, email, password, userType });
    await newUser.save();
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.status(500).json({ status: 'error', data: error.message });
  }
});

// Login
app.post("/login-user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email });
    if (!oldUser) return res.status(404).send({ error: "User doesn't exist!!" });
    const isMatch = await bcrypt.compare(password, oldUser.password);
    if (!isMatch) return res.status(401).send({ error: "Invalid credentials" });
    if (!process.env.JWT_SECRET) return res.status(500).send({ error: "Server configuration error" });
    await User.findOneAndUpdate({ email }, { $set: { isAvailable: true } }, { new: true });
   const token = jwt.sign(
    { _id: oldUser._id, email: oldUser.email }, // id is required!
    process.env.JWT_SECRET,
    { expiresIn: "1d" });
  res.send({ status: "ok", data: token, userType: oldUser.userType, id: oldUser._id, name: oldUser.name, email: oldUser.email });
  } catch (error) {
    res.status(500).json({ status: 'error', data: error.message });
  }
});



app.get('/patient-items',protect, async (req, res) => {
  try {
    const { email, id } = req.query;
    if (!email || !id) {
      return res.status(400).json({ error: 'Email and id are required' });
    }

    // Find the user by email and id
    const user = await User.findOne({ email, _id: id }).populate('items_id');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the populated items
    res.json({ items: user.items_id });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items', details: error.message });
  }
});


// Get all users
app.get("/get-all-user", async (req, res) => {
  try {
    const data = await User.find({});
    res.send({ status: "ok", data });
  } catch (error) {
    res.status(500).json({ status: 'error', data: error.message });
  }
});

// Delete user
app.post("/delete-user", async (req, res) => {
  try {
    const { id } = req.body;
    const deletedUser = await User.deleteOne({ _id: id });
    if (deletedUser.deletedCount === 0) return res.status(404).send({ error: "User not found" });
    res.send({ status: "ok", data: "User Deleted" });
  } catch (error) {
    res.status(500).json({ status: 'error', data: error.message });
  }
});

// Forgot password
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: "User not found" });

    // Generate a 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.passwordResetCode = resetCode;
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
    await user.save();

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${resetCode}\n\nIt will expire in 15 minutes.`,
      html: `<p>Your password reset code is: <b>${resetCode}</b></p><p>It will expire in 15 minutes.</p>`
    };
    await transporter.sendMail(mailOptions);
    res.send({ status: "ok", message: "Password reset code sent" });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).send({ error: "Something went wrong", details: error.message });
  }
});



// Reset password
app.post("/reset-password", async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    // Password strength check (same as registration)
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error: "Password must contain at least one digit, one uppercase letter, one lowercase letter, and be at least 6 characters long."
      });
    }

    const user = await User.findOne({
      email,
      passwordResetCode: code,
      passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) {
      // Remove code if incorrect or expired
      await User.updateOne({ email }, { $unset: { passwordResetCode: "", passwordResetExpires: "" } });
      return res.status(400).json({ error: "Invalid or expired code." });
    }

    // Hash the new password before saving
    user.password = newPassword; // ✅ Let the pre-save hook hash it!
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Get profile (requires authentication, simple version)
app.get("/profile", protect, async (req, res) => {
  try {
    const { email, id } = req.query;
    console.log("GET /profile called with:", { email, id });
    if (!email || !id) {
      return res.status(400).send({ error: "Email and id are required" });
    }
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(id);
    } catch (e) {
      console.error("Invalid ObjectId:", id);
      return res.status(400).send({ error: "Invalid id format" });
    }
    const user = await User.findOne({ email, _id: objectId }).populate('items_id');
    if (!user) return res.status(404).send({ error: "User not found" });
    const { password, ...userWithoutPassword } = user.toObject();
    console.log('Profile fetched:', userWithoutPassword);
    res.send({ status: "ok", data: userWithoutPassword });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).send({ error: error.message });
  }
});


// Update profile (requires authentication, simple version)
app.put('/profile', protect, async (req, res) => {
  try {
    const { isAvailable } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // <-- Add this
    const user = await User.findByIdAndUpdate(
      decoded._id, // Make sure decoded.id exists!
      { isAvailable },
      { new: true }
    );
    console.log("Decoded JWT:", decoded);
    console.log("Request body:", req.body);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ status: "ok", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete profile (requires authentication, simple version)
app.delete('/profile', protect, async (req, res) => {
  try {
    console.log("DELETE /profile body:", req.body);
    console.log("DELETE /profile query:", req.query);
    const id = req.query.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Add a new note
app.post('/notes', async (req, res) => {
  try {
    const note = new Note(req.body);
    const saved = await note.save();
    res.json(saved);
  } catch (err) {
    console.error('Error adding note:', err);
    res.status(500).json({ error: 'Failed to add the note' });
  }
});

// Get notes for a patient
app.get('/notes/:patientId', async (req, res) => {
  try {
    const notes = await Note.find({ patientId: req.params.patientId });
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes', err);
    res.status(500).json({ error: 'Failed to fetch the notes' });
  }
});

// Update a note
app.put('/notes/:id', async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Error updating the note:', err);
    res.status(500).json({ error: 'Failed to update the note.' });
  }
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'deleted' });
  } catch (err) {
    console.error('Error deleting the note:', err);
    res.status(500).json({ error: 'Failed to delete the note.' });
  }
});



// Root route
app.get('/', (req, res) => {
    res.send('🚀 Hello from Express server');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});