const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
console.log('__dirname',__dirname);
app.use(express.static(path.join('.', 'build')));
app.get('/*', function (req, res) {
   res.sendFile(path.join('.', 'build', 'index.html'));
});

app.listen(port, () => {
   console.log('Server is up!');
});

