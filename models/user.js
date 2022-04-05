const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/es/lib/isEmail');

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
    minlength: 8,
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
  },
});

userSchema.statics.findUserByCredentials = function userLogin(email, password) {
  this.findOne({ email })
    .then((user) => {
      if (!user) {
        // ошибка 'Пользователь с такой почтой не найден' код 401
      }
      // юзер найден
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // ошибка 'Неправильные почта или пароль' код 401
          }
          // аутентификация успешна
          // отправка данных пользователя
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
