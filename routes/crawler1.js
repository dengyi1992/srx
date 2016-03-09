var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var  request= require('request');
var Iconv = require('iconv').Iconv;//用于乱码解决
var iconv = new Iconv('GBK', 'UTF-8');

var options = {
    method: 'GET',
    encoding:null,
    url: 'http://www.27270.com/ent/meinvtupian/'
}
//var requrl =
/* GET users listing. */
router.get('/', function(req, res, next) {
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = iconv.convert(new Buffer(body, 'binary')).toString();
            acquireData(result);
        }
    });

    function acquireData(data) {
        var $ = cheerio.load(data);  //cheerio解析data
        var items = [];
        var meizi = $('.MeinvTuPianBox img').toArray();  //将所有的img放到一个数组中
        var ll = $('.MeinvTuPianBox a').toArray();
        var len = meizi.length;
        for (var i=0; i<len; i++) {
            var imgsrc = meizi[i].attribs.src;  //用循环读出数组中每个src地址
            var desc = meizi[i].attribs.alt;
            var href =ll[i].attribs.href;

            items.push({
                title:desc,
                imgurl1:imgsrc,
                h:href
            });
        }
        res.send(items);
    };

});

module.exports = router;
