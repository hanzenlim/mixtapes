module.exports = app => {
  app.get('/videos', (req, res) => {
    res.send('Videos Get Route');
  });
};
