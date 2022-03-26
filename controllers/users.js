/* eslint-disable quotes */
/* eslint-disable quote-props */
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
  // данные не записались, вернём ошибку
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') return res.status(ERROR_CODE).send({ "message": "Переданы некорректные данные при создании пользователя" });
      return res.status(500).send({ message: `На сервере произошла ошибка ${err}` });
    });
};

module.exports.findUser = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') return res.status(ERROR_CODE).send({ "message": "Переданы некорректные данные при создании пользователя" });
      return res.status(500).send({ message: `На сервере произошла ошибка ${err}` });
    });
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ "message": "Пользователь по указанному _id не найден" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') return res.status(ERROR_CODE).send({ "message": "Переданы некорректные данные. Пользователь по указанному _id не найден" });
      return res.status(500).send({ message: `На сервере произошла ошибка ${err}` });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') return res.status(ERROR_CODE).send({ "message": "Переданы некорректные данные при обновлении профиля" });
      return res.status(500).send({ message: `На сервере произошла ошибка ${err}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') return res.status(ERROR_CODE).send({ "message": "Запрашиваемый пользователь не найден" });
      return res.status(500).send({ message: `На сервере произошла ошибка ${err}` });
    });
};
