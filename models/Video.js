const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const videoSchema = new Schema({
  videoId: String,
  videoUrl: String,
  videoTitle: String,
  videoContent: String
});

// Name of Model Class & name of Schema
mongoose.model('video', videoSchema);

// Need to require file in index.js
