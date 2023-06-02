const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6479de7080c3f4edb2384332',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(PORT);
