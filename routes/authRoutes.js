const passport = require('passport');

module.exports = app => {
  // Redirecting user to google OAuth flow
  app.get(
    '/auth/google',
    // Passport - Authenticate the user who is coming on this route and use the strategy called google.
    passport.authenticate('google', {
      // Scope/Permissions - We're asking Google to give us access to the users profile/email info.
      scope: ['profile', 'email']
    })
  );

  // Exchanges code for user profile
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'), // Tell passport to handle this incoming request using the google strategy
    // After succesful authentification, peform this arrow function
    (req, res) => {
      res.redirect('/'); // After you login - redirect
    }
  );

  // LOGOUT
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/'); // After logging out redirect to root
  });

  // RETURNS CURRENT USER
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
