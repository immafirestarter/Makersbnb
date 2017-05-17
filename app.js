const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const path = require('path');
const app = express();
const db = require('./server/models')


app.use(session({
  cookieName: 'session',
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
});

app.post('/user/new', function(req, res) {
  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then(function(user) {
    req.session.user = user;
  })
  .then(setTimeout(function() {
    res.redirect('/welcome')
  }, 500))
});

app.get('/welcome', function(req, res) {
  if (req.session.user) {
    var currentUser = req.session.user
    res.render(path.resolve('views/home.html'), {
      username: currentUser.username,
      name: currentUser.name,
    });
  } else {
    res.redirect('/signup')
  };
});

app.get('/signup', function(req, res) {
  res.render(path.resolve('views/index.html'));
});

app.get('/listings', function(req, res) {
  Listing.findAll()
    .then(function (Listing) {
      res.json(Listing);
    });
});

app.get('/logout', function(req, res) {
  req.session.reset();
  res.render(path.resolve('views/logout.html'));
})

app.get('/login', function(req, res) {
  res.render(path.resolve('views/login.html'));
})

app.post('/user/login', function(req, res) {
  User.find({ where: { username: req.body.username, password: req.body.password }}).then(function(user) {
      if (!user) {
        res.redirect('/signup')
      } else {
        req.session.user = user;
        res.redirect('/welcome')
      }
    }).catch(function(err) {
      console.log('Error')
    });
});


require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
