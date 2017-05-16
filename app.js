var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var signup = require('./routes/signup');
var createUser = require('./routes/createUser');
var home = require('./routes/home');
var welcome = require('./routes/welcome');
const port = 3000

var app = express();

app.listen(port, (err) => {
  if (err) {
    return console.log('error:', err)
  }

  console.log(`server is listening on ${port}`)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({
    extended: true
}));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/signup', signup);
app.use('/createUser', createUser);
app.use('/welcome', welcome);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/test', (request, response) => {
  response.send('Hello from Express!')
});

app.get('/home', function(req, res) {
  res.sendFile('views/layouts/home.html', {root: __dirname })
});

app.post("/createUser", function (req, res) {
    console.log(req.body.user.name)
});


module.exports = app;
