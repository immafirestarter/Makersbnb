const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const path = require('path');
const app = express();
const db = require('./server/models')
const bcrypt = require('bcrypt-nodejs')
// const salt = bcrypt.genSaltSync(10);

app.use(session({
  cookieName: 'session',
  secret: 'very_secret_super_secret',
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

const User = db.User;
const Listing = db.Listing;

app.get('/welcome', function(req, res) {
  if (req.session.user) {
    var currentUser = req.session.user
    res.render(path.resolve('views/welcome.html'), {
      username: currentUser.username,
      name: currentUser.name,
    });
  } else {
    res.redirect('/signup')
  };
});

app.get('/test', function(req, res) {
  User.findAll()
    .then(function (User) {
      res.json(User);
    })
});

app.post('/user/new', function(req, res) {
  var pass = req.body.password;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt)
  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash
  }).then(function(user) {
    req.session.user = user;
  })
  .then(setTimeout(function() {
    res.redirect('/welcome')
  }, 500))
});

app.get('/signup', function(req, res) {
  res.render(path.resolve('views/index.html'));
});

app.get('/logout', function(req, res) {
  req.session.reset();
  res.render(path.resolve('views/logout.html'));
})

app.get('/login', function(req, res) {
  res.render(path.resolve('views/login.html'));
})

app.post('/user/login', function(req, res) {
  var pass = req.body.password;
  var user = User.find({ where: { username: req.body.username}}).then(function(user) {
    var result = bcrypt.compareSync(pass, user.password);
      if (result == true){
        req.session.user = user
        res.redirect('/welcome');
      } else {
        res.redirect('/signup');
      };
  });
});

app.get('/listings', function(req, res) {
  Listing.findAll()
    .then(function (Listing) {
      res.json(Listing);
    });
});

app.get('/listings/new', function(req, res) {
  res.render(path.resolve('views/listings.html'));
});

app.post('/listings/create', function(req, res) {
  Listing.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    price: req.body.price
  }).then(setTimeout(function() {
    res.redirect('/welcome')
  }, 500))
});

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
