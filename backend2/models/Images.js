const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  data: Buffer,         
  contentType: String, 
  name: String, 
});


module.exports = mongoose.model("Image", imageSchema);
