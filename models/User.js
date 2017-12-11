const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// Name of Model Class & name of Schema
mongoose.model('users', userSchema);

// Need to require file in index.js
