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
    (req, res) => {
      res.redirect('/surveys'); // After you login - redirect
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    // res.send(req.user);
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
