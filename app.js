const express = require("express");
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.get("/", (req, res, next) => {
  res.send("Hello");
  next();
});

app.listen(3000, () => {
  console.log("ON server 3000");
});
