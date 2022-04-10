const router = require('express').Router();
const { celebrate, Joi } = require('celebrate'); // импорт валидатора
const regExp = require('../utils/regex'); // импорт регулярки
// импорт контроллеров
const {
  findUsers,
  findUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

// роуты пользователей
router.get('/users', findUsers);
router.get('/users/me', findUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regExp),
  }),
}), updateAvatar);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), findUserById);

module.exports = router;
