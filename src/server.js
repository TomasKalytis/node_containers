'use strict';
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

//Middleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Containers!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
