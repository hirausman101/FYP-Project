const { models } = require("mongoose");

// Notification schema and routes (already defined)
const notificationSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Patient: { type: String, required: true },
    Intensity: { type: String, required: true },
    Time: { type: Date, required: true },
}); 

const Notification = mongoose.model('notifications', notificationSchema);

module.exports = Notification;