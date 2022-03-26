/* eslint-disable quote-props */
/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();
// временная авторизация
app.use((req, res, next) => {
  req.user = {
    _id: '61a237e41a659eb38914e3fd', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
// подключаю парсер
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// подключаю роутинг
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ 'message': 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
