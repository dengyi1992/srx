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

/**
 * 爬虫
 * @type {router|exports|module.exports}
 */
var yule = require('./routes/yule');
var qiwen = require('./routes/qiwen');
var crawler = require('./routes/crawler');
var crawler1 = require('./routes/crawler1');
var crawler2 = require('./routes/crawler2');
var tenxunit = require('./routes/tenxunit');
var toutiaoc_1 = require('./routes/toutiaoc_1');
var toutiaoc_wenge = require('./routes/toutiaoc_wenge');
var topnews9 = require('./routes/topnews9');
/**
 * 登錄
 */
var admin_login=require('./routes/login_admin.js');

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
 * get
 */
app.use('/users', users);
app.use('/health_c',health);
app.use('/intime_c',intime);
app.use('/keji_c',keji);
app.use('/meitu_c',meitu);
app.use('/weixinjingxuan_c',weixinjingxuan);
app.use('/yule_c',yule);
app.use('/qiwen_c',qiwen);

/**
 * 爬虫接口
 * get
 */
app.use('/crawler',crawler);
app.use('/crawler1',crawler1);
app.use('/crawler2',crawler2);
//例如： /crawler2?num=1, num表示第几页
app.use('/tenxunit',tenxunit);
app.use('/toutiaoc_1',toutiaoc_1);
app.use('/toutiaoc_wenge',toutiaoc_wenge);
app.use('/topnews9',topnews9);


/**
 * 管理員登錄
 */
app.use('/admin_login',admin_login);
/**
 * 方式 post
 * /admin_login
 * x-www-form-urlencoded
 * params:
 * name : deng
 * password : deng
 */


/**
 * 客户端接口
 * 现在先用简单的get接口完成，之后可在app端的xml文件中加入一些密钥来访问服务器
 * 一方面可以防止他人盗取接口，另一方面防止他人攻击，用这种密钥来验证可以防止服务因为攻击访问量过大
 * 造成服务器不必要的开销
 * 现在先定义几个常用的数据请求接口，名字待定
 *
 * **推荐
 * **娱乐
 * **天下事
 * **科技
 * **搞笑
 * **焦点
 * **影视
 * **财经
 * **体育
 * **游戏
 * **情感
 * **生活
 * **视角
 * **创意
 * **汽车
 *
 *
 *
 */
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
