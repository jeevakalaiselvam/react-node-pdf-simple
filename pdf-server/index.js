const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 4000;
const cors = require('cors');
app.use(cors());

app.get('/pdf', function (req, res, next) {
  var stream = fs.createReadStream('./public/sample.pdf');
  var filename = 'sample.pdf';
  // Be careful of special characters

  filename = encodeURIComponent(filename);
  // Ideally this should strip them

  res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');

  stream.pipe(res);
});

app.listen(port, () => {
  console.log('Server listening on port ', port);
});
