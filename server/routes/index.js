const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const Todo = require('../models').Todo;
const path = require('path');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.get('/home', function(req, res) {
    res.sendFile(path.resolve('views/index.html'));
  });

  app.get('/about', function(req, res) {
    res.render('about', {name: 'Tim'});
  });

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.get('/lolcats', todosController.list);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.delete('/api/todos/:todoId', todosController.destroy);

  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete(
    '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  );
  app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
