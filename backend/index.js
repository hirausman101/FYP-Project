const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');

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



// Item schema and routes (already defined)
const itemSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Gender: { type: String, required: true },
    Status: { type: String, required: true },
});
const Item = mongoose.model('Item', itemSchema);

// Notification schema and routes (already defined)
const notificationSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Patient: { type: String, required: true },
    Intensity: { type: String, required: true },
    Time: { type: Date, required: true },
}); 
const Notification = mongoose.model('Notification', notificationSchema);

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

const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  relationship: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

const patientSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: true
  },
  emergencyContact: {
    type: emergencyContactSchema,
    required: true
  }
},
{ collection: 'patientData' });

const Patient = mongoose.model('Patient', patientSchema);

app.get('/patientData', async (req, res) => {
  try {
    const { name } = req.query;
    console.log('Received name:', name);

    let filter = {};
    if (name && name.trim() !== '') {
      filter.name = { $regex: new RegExp(`^${name}$`, 'i') }; 
    }

    console.log('Filter:', filter);
    const patients = await Patient.find(filter);

    if (!patients.length) {
      return res.status(404).json({ message: 'No patients found' });
    }

    res.json(patients);
  } catch (error) {
    console.error('Error fetching patient data:', error);
    res.status(500).json({ message: 'Error fetching patient data', error });
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
