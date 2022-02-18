/* eslint no-underscore-dangle: [1, { "allow": ["_id"] }] */
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
  // данные не записались, вернём ошибку
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' }));
};

module.exports.findUser = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(400).send({ message: 'Пользователь по указанному _id не найден.' }));
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params._id)
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(404).send({ message: 'Пользователь по указанному _id не найден.' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send({ message: `Произошла ошибка ${err}` }));
};
