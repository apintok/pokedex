const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

// SERVER PUBLIC DIRECTORY
const publicDir = express.static(path.join(__dirname, '/public'));
app.use(publicDir);
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('*', (req, res, next) => {
  res.status(404).write('Page Not Found!');
  res.send();
});

app.listen(port, () => {
  console.log(`Server Running on PORT: ${port}.`);
});
