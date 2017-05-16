const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const db = require('./server/models')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const Todo = db.Todo;

app.get('/users', function(req, res) {
  Todo.findAll()
    .then(function (Todo) {
      res.json(Todo[0].title);
    });
});

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
