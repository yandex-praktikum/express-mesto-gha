const router = require('express').Router();
// импорт контроллеров
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// роуты карточек
router.post('/cards', createCard);
router.get('/cards', getCards);
router.delete('/cards/:userId', deleteCard);
router.put('/cards/:userId/likes', likeCard);
router.delete('/cards/:userId/likes', dislikeCard);

module.exports = router;
