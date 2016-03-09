var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');
var Iconv = require('iconv').Iconv;//用于乱码解决
var iconv = new Iconv('GBK', 'UTF-8');
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
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

var items = [];
var options = {
    method: 'GET',
    encoding: null,
    url: 'http://bbs.hupu.com/bxj-1'
}
var Iconv = require('iconv').Iconv;//用于乱码解决
var iconv = new Iconv('GBK', 'UTF-8');
/* GET users listing. */
router.get('/', function (req, res, next) {
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
              //返回请求页面的HTML
            var result = iconv.convert(new Buffer(body, 'binary')).toString();
            acquireData(result);
        }
    });

    function acquireData(data) {
        var $ = cheerio.load(data);  //cheerio解析data
        var link = $('tr .p_title div').toArray();  //将所有的img放到一个数组中

        var len = link.length;
        for (var i = 0; i < len; i++) {
            var href ='http://bbs.hupu.com'+link[i].next.next.attribs.href
            var titl =link[i].next.next.children["0"].data;


            items.push({
                title: titl,
                link: href
            });
        }
        res.send(items);
        //myEvents.emit('geted');
    };

});
myEvents.on('geted',function(){
   //寫入數據庫
    for (var i=0;i<items.length;i++){
        var  userAddSql_Params = [items[i].title,items[i].h,items[i].desc,items[i].imgurl];
        var  userAddSql = 'INSERT INTO topnews9(title,url,abstract,image_url) VALUES(?,?,?,?)';

        conn.query(userAddSql,userAddSql_Params,function(err,result){
            if (err){
                console.error(err);
                return;
            }
        });


    }
    items=[];

});

module.exports = router;
