const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions');

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
    .then(console.log(req.currentUser.user.name))
});

app.post('/user/new', function(req, res) {
  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  .then(req.currentUser.user = User.findOne({where: {username: req.body.username}}))
  .then(res.redirect('/test'))
});

app.get('/listings', function(req, res) {
  Listing.findAll()
    .then(function (Listing) {
      res.json(Listing);
    });
});

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
