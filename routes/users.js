const router = require('express').Router();
// импорт контроллеров
const {
  createUser,
  findUser,
  findUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

// роуты пользователей
router.get('/users', findUser);
router.get('/users/:userId', findUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
