/* eslint-disable quotes */
/* eslint-disable quote-props */
const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
  // данные не записались, вернём ошибку
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') return res.status(ERROR_CODE).send({ "message": "Переданы некорректные данные при создании карточки" });
      return res.status(500).send({ "message": `На сервере произошла ошибка ${err}` });
    });
};
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({ "message": `На сервере произошла ошибка ${err}` }));
};
module.exports.deleteCard = (req, res) => {
  Card.findById(req.params._id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ "message": "Карточка с указанным id не найдена" });
      }
      if (card.owner.toString() !== req.user._id.toString()) {
        return res.status(403).send({ message: 'Карточка создана другим пользователем.' });
      }
      card.remove();
      return res.status(200).send({ message: 'Карточка успешно удалена.' });
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') return res.status(ERROR_CODE).send({ "message": "Переданы некорректные данные при удалении карточки" });
      return res.status(500).send({ "message": `На сервере произошла ошибка ${err}` });
    });
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ "message": "Карточка с указанным id не найдена" });
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') return res.status(ERROR_CODE).send({ "message": "Переданы некорректные данные при лайке карточки" });
      return res.status(500).send({ "message": `На сервере произошла ошибка ${err}` });
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.userId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ "message": "Карточка с указанным id не найдена" });
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') return res.status(ERROR_CODE).send({ "message": "Переданы некорректные данные при удалении лайка карточки" });
      return res.status(500).send({ "message": `На сервере произошла ошибка ${err}` });
    });
};
