// ======================================
// Setup and Configurations for passport
// ======================================
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Comes with diff properties | We only care about Strategy
const keys = require('../config/keys');
const mongoose = require('mongoose');

// Gets access to mongoose User model class
const User = mongoose.model('users');

// ===========================
// SERIALIZE USER
// ===========================
// Takes a User model and generates unique identifier(Token) for user. - Then passport will stuff it into a cookie
passport.serializeUser((user, done) => {
  done(null, user.id); // Using ID from mongoDB vs. google ID - bcuz diff way of signing in (google, facebook, etc)
});
// ===========================
// DESERIALIZE USER
// ===========================
// Takes the Token(user.id), pass to deserializeUser and turns it into a user model instance.
// End result = User model instances added to req.user
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
    // (accessToken, refreshToken, profile, done) => {
    //   User.findOne({ googleId: profile.id}).then(existingUser => {
    //     if (existingUser) {
    //       done(null, existingUser);
    //     } else {
    //       new User ({googleId: profile.id})
    //       .save()
    //       .then(user => done(null, user))
    //     }
    //   })
    // }
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
