var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var health = require('./routes/health');
var intime = require('./routes/intime');
var keji = require('./routes/keji');
var meitu = require('./routes/meitu');
var weixinjingxuan = require('./routes/weixinjingxuan');
var yule = require('./routes/yule');
var qiwen = require('./routes/qiwen');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
/**
 * 以下为控制接口
 */
app.use('/users', users);
app.use('/health_c',health);
app.use('/intime_c',intime);
app.use('/keji_c',keji);
app.use('/meitu_c',meitu);
app.use('/weixinjingxuan_c',weixinjingxuan);
app.use('/yule_c',yule);
app.use('/qiwen_c',qiwen);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
