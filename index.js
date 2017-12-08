const express = require('express');
const app = express(); // Used to set up configuration that will listen for incoming requests. | Routes

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
