const User = require('../models').User;
const Listing = require('../models').Listing;

module.exports = {
  create(req, res) {
    return User
      .create({
        title: req.body.title,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return User
      .findAll({
        include: [{
          model: Listing,
          as: 'listings',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Listing, as: 'listings' }, 'createdAt', 'ASC'],
        ],
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return User
      .findById(req.params.userId, {
        include: [{
          model: Listing,
          as: 'listings',
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findById(req.params.userId, {
        include: [{
          model: Listing,
          as: 'listings',
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            title: req.body.title || user.title,
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
