const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const path = require('path');
const app = express();
const db = require('./server/models')


app.use(session({
  cookieName: 'currentUser',
  secret: 'very_secret_super_secret',
}));

app.use(logger('dev'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const User = db.User;
const Listing = db.Listing;

app.get('/test', function(req, res) {
  User.findAll()
    .then(function (User) {
      res.json(User);
    })
    // .next(console.log(req.currentUser.user.name))
});

app.post('/user/new', function(req, res) {
  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  .then(setTimeout(function() {
    req.currentUser.user = User.findAll({where: {username: req.body.username}});
  }, 300))
  .then(setTimeout(function() {
    res.redirect('/welcome')
  }, 500))
});

app.get('/welcome', function(req, res) {
  if (req.currentUser.user) {
    var currentUser = req.currentUser.user.fulfillmentValue[0]
    res.render(path.resolve('views/home.html'), {
      username: currentUser.username,
      name: currentUser.name,
    });
  } else {
    console.log("NO BDDY");
  };
});

app.get('/signup', function(req, res) {
  res.render(path.resolve('views/index.html'), {
    string: 'random_value',
    other: 'value'
  });
});

app.get('/userfind', function(req, res) {
  var success = User.findAll({where: {id: 1}}).then(function (currentUser) { res.json(currentUser[0]) });
});

app.get('/listings', function(req, res) {
  Listing.findAll()
    .then(function (Listing) {
      res.json(Listing);
    });
});

app.get('/logout', function(req, res) {
  req.currentUser.reset();
  res.render(path.resolve('views/logout.html'));
})

app.get('/login', function(req, res) {
  res.render(path.resolve('views/login.html'));
})

app.post('/user/login', function(req, res) {
    req.currentUser.user = User.findAll({where: {username: req.body.username}})
  .then(setTimeout(function() {
    res.redirect('/welcome')
  }, 500))
});

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;

//git comment
