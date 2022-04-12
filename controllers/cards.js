const Card = require('../models/card');
const BadReqError = require('../errors/BadReqError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
  // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadReqError('Переданы некорректные данные при создании карточки'));
      next(err);
    });
};
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка с указанным id не найдена');
      if (card.owner.toString() !== req.user._id.toString()) throw new ForbiddenError('Карточка создана другим пользователем');
      return card.remove()
        .then(() => res.status(200).send({ message: 'Карточка успешно удалена.' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadReqError('Переданы некорректные данные при удалении карточки'));
      next(err);
    });
};
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadReqError('Переданы некорректные данные при лайке карточки'));
      next(err);
    });
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadReqError('Переданы некорректные данные при удалении лайка карточки'));
      next(err);
    });
};
