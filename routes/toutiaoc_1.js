var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var  request= require('request');
var Iconv = require('iconv').Iconv;//用于乱码解决
var iconv = new Iconv('GBK', 'UTF-8');

var options = {
    method: 'GET',
    encoding:null,
    url: 'http://toutiao.com/m4897598191/'
}
//var requrl =
/* GET users listing. */
router.get('/', function(req, res, next) {
    var page=req.query.num;
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //var result = iconv.convert(new Buffer(body, 'binary')).toString();
            acquireData(body);
        }
    });

    function acquireData(data) {
        var $ = cheerio.load(data);  //cheerio解析data
        var items = [];
        var link = $('.pin h3 a').toArray();  //将所有的img放到一个数组中
        var linkimg = $('.pin .list_image ul').toArray();  //将所有的img放到一个数组中

        //var title =$('.pin h3').;
        //var ll = $('.thumbnail a').toArray();
        var len = link.length;
        for (var i=0; i<len; i++) {
            var href =link[i].attribs.href;
            var titl =link[i].children[0].data;
            var imgurl='';
            if (isExitsVariable(linkimg[i])){
                imgurl =linkimg[i].children["0"].next.children["0"].children["0"].attribs.src;
            }

            //console.log(imgsrc);                //输出地址
            items.push({
                title:titl,
                h:href,
                imgurl1:imgurl
            });
        }
        res.send(items);
    };

    //res.json({'msg':'success'});
});
function isExitsVariable(variableName) {
    try {
        if (typeof(variableName) == "undefined") {
            //alert("value is undefined");
            return false;
        } else {
            //alert("value is true");
            return true;
        }
    } catch(e) {}
    return false;
}
module.exports = router;
