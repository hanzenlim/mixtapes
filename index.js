const express = require('express');
const authRoutes = require('./routes/authRoutes'); // Function - takes app and attaches the auth routes
const mongoose = require('mongoose');
const keys = require('./config/keys');
// MODELS
require('./models/User'); // Order of operation matters
// EXECUTES PASSPORT
require('./services/passport');

// Connect to mongoDB in mlab
mongoose.connect(keys.mongoURI);

const app = express(); // Config setup that will listen for my routes

authRoutes(app); // call authroutes with app

const PORT = process.env.PORT || 5000;
app.listen(PORT);
