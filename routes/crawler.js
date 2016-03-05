var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var  request= require('request');
var requrl = 'http://m.xxxiao.com/';
/* GET users listing. */
router.get('/', function(req, res, next) {
    request(requrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);    //返回请求页面的HTML
            acquireData(body);
        }
    });

    function acquireData(data) {
        var $ = cheerio.load(data);  //cheerio解析data
        var items = [];
        var meizi = $('.post-thumb img').toArray();  //将所有的img放到一个数组中
        var ll=$('.post-thumb a').toArray()
        console.log(meizi.length);
        var len = meizi.length;
        for (var i=0; i<len; i++) {
            var imgsrc = meizi[i].attribs.src;  //用循环读出数组中每个src地址
            var desc = meizi[i].attribs.alt;
            var href =ll[i].attribs.href;

            console.log(imgsrc);                //输出地址
            items.push({
                title:desc,
                link:imgsrc,
                h:href
            });
        }
        res.send(items);
    };

});

module.exports = router;
