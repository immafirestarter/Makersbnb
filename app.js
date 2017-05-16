const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

const db = require('./server/models')

// Log requests to the console.
app.use(logger('dev'));

app.set('view engine', 'ejs');

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const Todo = db.Todo;

app.get('/users', function(req, res) {
  Todo.findAll()
    .then(function (todos) {
      res.json(todos[0].title);
    });
});

// Require our routes into the application.
require('./server/routes')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
