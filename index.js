const express = require('express');
const authRoutes = require('./routes/authRoutes'); // Function - takes app and attaches the auth routes
const videoRoutes = require('./routes/videoRoutes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // Keeps track of user sessions using cookies
const passport = require('passport');
const bodyParser = require('body-parser'); // Used for Post, PUT, Patch requests
const keys = require('./config/keys');
//===================
// MODELS
//===================
require('./models/User'); // Order of operation matters
// EXECUTES PASSPORT
require('./services/passport');

// Connect to mongoDB in mlab
mongoose.connect(keys.mongoURI);

const app = express(); // Config setup that will listen for my routes

// MIDDLEWARES - Wired up using app.use
app.use(bodyParser.json());
app.use(
  cookieSession({
    // In milseconds Conversion - 30 days | 24 hrs | 60min | 60 seconds | 1000 milseconds
    maxAge: 30 * 24 * 60 * 60 * 1000, // Duration of cookie for 30days
    keys: [keys.cookieKey]
  })
);

// Tell passport to make use of cookies to manage authentification
app.use(passport.initialize());
app.use(passport.session());

//===================
// ROUTES
//===================
authRoutes(app); // call authroutes with app
videoRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
