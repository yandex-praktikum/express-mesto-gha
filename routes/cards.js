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
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
