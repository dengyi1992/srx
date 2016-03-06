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
    url: 'http://toutiao.com/m3651069942/p2'
}
/* GET users listing. */
router.get('/', function (req, res, next) {
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);    //返回请求页面的HTML
            acquireData(body);
        }
    });

    function acquireData(data) {
        var $ = cheerio.load(data);  //cheerio解析data
        var link = $('.pin h3 a').toArray();  //将所有的img放到一个数组中
        var linking = $('.pin .list_image ul').toArray();  //将所有的img放到一个数组中

        console.log(link.length);
        var len = link.length;
        for (var i = 0; i < len; i++) {
            var href = link[i].attribs.href;
            var titl = link[i].children[0].data;
            items.push({
                title: titl,
                h: href,
                imgurl1: linking[0].children["1"].children["0"].children["0"].attribs.src,
                imgurl2: linking[0].children["3"].children["0"].children["0"].attribs.src,
                imgurl3: linking[0].children["5"].children["0"].children["0"].attribs.src

            });
        }
        res.send(items);
        myEvents.emit('geted');
    };

});
myEvents.on('geted',function(){
   //寫入數據庫
    for (var i=0;i<items.length;i++){
        var  userAddSql_Params = [items[i].title,items[i].h,items[i].imgurl1,items[i].imgurl2,items[i].imgurl3];
        console.log(userAddSql_Params);
        var  userAddSql = 'INSERT INTO toutiao_wenge(title,url,image_url1,image_url2,image_url3) VALUES(?,?,?,?,?)';

        conn.query(userAddSql,userAddSql_Params,function(err,result){
            if (err){
                console.error(err);
                return;
            }
            console.log(result);
        });


    }
    items=[];

});

module.exports = router;
