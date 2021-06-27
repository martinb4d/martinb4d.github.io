const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('build'));

app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
   console.log('Server is up!');
});