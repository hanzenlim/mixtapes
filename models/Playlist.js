const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const playlistSchema = new Schema({
  googleId: String,
  playlist: [String]
});

// Name of Model Class & name of Schema
mongoose.model('playlist', playlistSchema);

// Need to require file in index.js
