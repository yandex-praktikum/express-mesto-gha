/* eslint no-underscore-dangle: [1, { "allow": ["_id"] }] */
const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
  // данные не записались, вернём ошибку
    .catch((err) => res.status(400).send({ message: `Переданы некорректные дынные. Произошла ошибка ${err}` }));
};
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};
module.exports.deleteCard = (req, res) => {
  Card.findById(req.params._id)
    .then((card) => {
      if (card.owner.toString() === req.user._id.toString()) {
        card.remove();
        res.status(200).send({ message: 'Карточка успешно удалена.' });
      } else {
        res.status(403).send({ message: 'Карточка создана другим пользователем.' });
      }
    })
    .catch((err) => res.status(404).send({ message: `Карточка не найдена. Произошла ошибка ${err}` }));
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.userId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => res.status(404).send({ message: `Карточка не найдена. Произошла ошибка ${err}` }));
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.userId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => res.status(404).send({ message: `Карточка не найдена. Произошла ошибка ${err}` }));
};
