const Listing = require('../models').Listing;

module.exports = {
  create(req, res) {
    return Listing
      .create({
        content: req.body.content,
        userId: req.params.userId,
      })
      .then(listing => res.status(201).send(listing))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Listing
      .find({
        where: {
          id: req.params.listingId,
          userId: req.params.userId,
        },
      })
      .then(listing => {
        if (!listing) {
          return res.status(404).send({
            message: 'Listing Not Found',
          });
        }

        return listing
          .update({
            content: req.body.content || listing.content,
            complete: req.body.complete || listing.complete,
          })
          .then(updatedListing => res.status(200).send(updatedListing))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Listing
      .find({
        where: {
          id: req.params.listingId,
          userId: req.params.userId,
        },
      })
      .then(listing => {
        if (!listing) {
          return res.status(404).send({
            message: 'Listing Not Found',
          });
        }

        return listing
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
