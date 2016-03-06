var express = require('express');
var querystring = require('querystring');
var util = require('util');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'srx',
  port:3306
});
conn.connect();
/* post users listing. */
router.use(bodyParser.urlencoded({
  extended: true
}));
router.post('/', function(req, res, next) {
  console.log(req.body.name);
  var  selectUser = 'SELECT * FROM users WHERE name =? AND password = ?';
  var  selectParams =[req.body.name,req.body.password];
  console.log(selectParams)
  conn.query(selectUser,selectParams,function(err, rows, fields){
    if (err) {
      res.json({msg:'err',content:'数据库错误'});

    };
    if (rows.length>=1){
      res.json({msg:'success',content:'登录成功'});

    }else {
      res.json({msg:'failed',content:'用户名或者密码错误'});
    }

  });

});

module.exports = router;
