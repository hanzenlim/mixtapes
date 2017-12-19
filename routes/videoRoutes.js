module.exports = app => {
  app.get('/api/videos', (req, res) => {
    res.send('Videos Get Route');
  });
};
