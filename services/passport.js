// ======================================
// Setup and Configurations for passport
// ======================================
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Comes with diff properties | We only care about Strategy
const keys = require('../config/keys');
const mongoose = require('mongoose');

// Gets access to mongoose User model class
const User = mongoose.model('users');

// Takes a User model and generates unique identifier(toekn) for user. - Then stuff it into a cookie
// Call serializUser with the user to generate the identifying piece of info
passport.serializeUser((user, done) => {
  done(null, user.id); // Using ID from mongoDB vs. google ID - bcuz diff way of signing in (google, facebook, etc)
});

// Takes an ID/cookie/Token, pass to deserializeUser and turns it into a user model instance
// Take identifying piece of info from cookie, pass into 'deserializeUser' to turn it into a user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// ===========================
// 1) PASSPORT CONFIGURATION
// ===========================
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', // After user grants permissions - redirect to this route
      proxy: true
    },
    // Opportunity to take all the info that we just got back (profile: user info | accessToken: gives us permission from google)
    async (accessToken, refreshToken, profile, done) => {
      // ===========================================
      // MONGOOSE QUERY - Adds a new user to our DB
      // ===========================================

      // First check if there is an existing user
      const existingUser = await User.findOne({ googleId: profile.id });

      // If We already have a record with the given profile ID
      if (existingUser) {
        // Skip user creation
        return done(null, existingUser);
      }
      // We dont have a record with this ID, create a new user!
      const user = await new User({ googleId: profile.id }).save(); // Create & Save new user to database
      done(null, user);
    }
  )
);
