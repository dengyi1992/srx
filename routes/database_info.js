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
  password:'dengyi',
  database:'information_schema',
  port:3306
});
conn.connect();
/* post users listing. */
router.use(bodyParser.urlencoded({
  extended: true
}));
router.get('/', function(req, res, next) {
  var  selectTableInfo = 'SELECT * FROM TABLES where TABLE_SCHEMA=\'srx\'';
  conn.query(selectTableInfo,function(err, rows, fields){
    if (err) {
      res.json({msg:'err',content:'数据库错误'});

    }else {
      //console.log(rows);
      res.json({msg:'success',content:rows});
    }




  });

});

module.exports = router;
