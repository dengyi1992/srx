var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var  request= require('request');
var Iconv = require('iconv').Iconv;//用于乱码解决
var iconv = new Iconv('GBK', 'UTF-8');

var options = {
    method: 'GET',
    encoding:'UTF-8',
    url: 'http://tech.qq.com/it.htm'
}
//var requrl =
/* GET users listing. */
router.get('/', function(req, res, next) {
    var page=req.query.num;
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            //var result = iconv.convert(new Buffer(body, 'binary')).toString();
            //console.log(result);    //返回请求页面的HTML
            acquireData(body);
        }
    });

    function acquireData(data) {
        var $ = cheerio.load(data);  //cheerio解析data
        var items = [];
        var img = $('.Q-tpList img').toArray();  //将所有的img放到一个数组中
        var ll = $('.Q-tpList a').toArray(); //链接
        var desc =$('.Q-tpList p').toArray();//内容
        console.log(img.length);
        var len = img.length;
        for (var i=0; i<len; i++) {
            var imgsrc = img[i].attribs.src;  //用循环读出数组中每个src地址
            var title = img[i].attribs.alt;
            var link =ll[i].attribs.href;
            var descript=desc.text;


            //console.log(imgsrc);                //输出地址
            items.push({
                title:title,
                imgUrl:imgsrc,
                url:link,
                desc:descript
            });
        }
        res.send(items);
    };

});

module.exports = router;
