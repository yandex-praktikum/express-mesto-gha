const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const AuthError = require('../errors/AuthError');
const regExp = require('../utils/regex');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validator: ((v) => regExp.test(v)),
  },
});

userSchema.statics.findUserByCredentials = function loginUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // ошибка 'Пользователь с такой почтой не найден' код 401
        throw new AuthError('Неправильные почта или пароль');
      }
      // юзер найден
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // ошибка 'Неправильные почта или пароль' код 401
            throw new AuthError('Неправильные почта или пароль');
          }
          // аутентификация успешна
          // отправка данных пользователя
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
