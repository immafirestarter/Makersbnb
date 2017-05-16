const usersController = require('../controllers').users;
const listingsController = require('../controllers').listings;
const path = require('path');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
  }));


  // app.get('/home', function(req, res) {
  //   res.sendFile(path.resolve('views/index.ejs'));
  // });

  app.get('/home', function(req, res) {
    res.render(path.resolve('views/index.html'), {
      string: 'random_value',
      other: 'value'
    });
});

  app.get("/thetest", function(req, res) {
    res.render(__dirname + "/views/index");
});

  app.get('/test', function(req, res) {
    User.findAll()
      .then(function (User) {
        res.json(User);
      });
  });

  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
  app.get('/api/users/:listing', usersController.retrieve);
  app.put('/api/users/:userId', usersController.update);
  app.delete('/api/users/:userId', usersController.destroy);

  app.post('/api/users/:userId/items', listingsController.create);
  app.put('/api/users/:userId/items/:listingId', listingsController.update);
  app.delete(
    '/api/users/:userId/items/:listingId', listingsController.destroy
  );
  app.all('/api/users/:userId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
