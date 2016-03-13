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
var upload = require('./routes/upload');
var upload_file =require('./routes/upload_file');
var database_info =require('./routes/database_info');

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
var buxingjie= require('./routes/buxingjie');
var toutiao_common= require('./routes/toutiao_common');
var zanker = require('./routes/zanker');
var recommend= require('./routes/recommend');
var common_i =require('./routes/common');
var toutiao_common_c =require('./routes/toutiao_common_c');
var neihan_c =require('./routes/neihan_c');
var neihan =require('./routes/neihan');
var budejie_c =require('./routes/budejie_c');
var budejie =require('./routes/budejie');

/**
 * 登錄
 */
var admin_login=require('./routes/login_admin.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var EventEmitter = require('events').EventEmitter;
/**
 * 定义全局事件对象
 */
messageEvents = new EventEmitter();
APP_PATH=__dirname;

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
app.use('/buxingjie',buxingjie);
app.use('/toutiao_common',toutiao_common);
app.use('/zanker',zanker);
app.use('/toutiao_common_c',toutiao_common_c);
app.use('/neihan_c',neihan_c);
app.use('/budejie_c',budejie_c);

/**
 * 管理員登錄
 */
app.use('/admin_login',admin_login);
/**
 * 数据库信息
 */
app.use('/database_info',database_info);


/**
 * 方式 post
 * /admin_login
 * x-www-form-urlencoded
 * params:
 * name : 978548481@qq.com
 * password : dengyi
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
app.use('/recommend',recommend);
app.use('/common',common_i);
app.use('/neihan',neihan);
app.use('/budejie',budejie);
// catch 404 and forward to error handler

app.use('/upload',upload);
app.use('/upload_file',upload_file);

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
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(2999);
io.on('connection', function (socket) {
  console.log("connection");
  socket.emit('dengyi',{deng:'这是测试数据'});
  socket.on('new admin', function (data) {
    console.log(data);
  });

  messageEvents.on('taskfinish',function(data){
    console.log(data);
    socket.emit('taskfinish',data);
  });



});

module.exports = app;
