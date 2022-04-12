const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadReqError = require('../errors/BadReqError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    })
      .then((user) => {
        res.status(201).send({
          data: {
            email: user.email,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
          },
        });
      })
    // данные не записались, вернём ошибку
      .catch((err) => {
        if (err.name === 'ValidationError') next(new BadReqError('Переданы некорректные данные при создании пользователя'));
        if (err.code === 11000) next(new ConflictError('Пользователь с таким адресом электроной почты уже зарегистрирован!'));
        next(err);
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .status(200)
        .send({
          data: {
            _id: user._id,
            email: user.email,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
          },
        });
    })
    .catch(next);
};

module.exports.findUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports.findUserById = (req, res, next) => {
  const searchedUser = req.params.userId ? req.params.userId : req.user._id;
  User.findById(searchedUser)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadReqError('Переданы некорректные данные. Пользователь по указанному _id не найден'));
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadReqError('Переданы некорректные данные при обновлении данных пользователя'));
      if (err.name === 'CastError') next(new BadReqError('Переданы некорректные данные при обновлении данных пользователя'));
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadReqError('Переданы некорректные данные при обновлении данных пользователя'));
      if (err.name === 'CastError') next(new BadReqError('Переданы некорректные данные при обновлении данных пользователя'));
      next(err);
    });
};
