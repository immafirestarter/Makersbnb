const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const path = require('path');
const app = express();
const db = require('./server/models');
const bcrypt = require('bcrypt-nodejs');
const imgur = require('imgur-node-api');

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


//Actual Controller starts below

app.get('/welcome', function(req, res) {
  if (req.session.user) {
    user = req.session.user
    listing = Listing.findAll({where: {userId: user.id}}).then(function(listing){
    res.render(path.resolve('views/welcome.html'), {
      username: req.session.user.username,
      name: req.session.user.name,
      listing: listing
    })});
  } else {
    res.render(path.resolve('views/error/noUser.html'))
  };
});


app.get('/test', function(req, res) {
  User.findAll().then(function
    (User) {
      res.json(User);
  });
});

app.post('/user/new', function(req, res) {
  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
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
  User.find({ where: { username: req.body.username}}).then(function(user) {
    var result = bcrypt.compareSync(req.body.password, user.password);
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
  if ( req.session.user ){
    res.render(path.resolve('views/listings/new.html'));
  } else {
    res.render(path.resolve('views/error/noUser.html'));
  };
});

app.post('/listings/create', function(req, res) {
  user = req.session.user
  Listing.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    price: req.body.price,
    userId: user.id
  }).then(setTimeout(function() {
    res.redirect('/welcome')
  }, 500))
});

app.get('/listings/display', function(req, res) {
  Listing.findAll().then(function(listing){
    res.render(path.resolve('views/listings/display.html'), {
      listing: listing
    });
  });
});

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
