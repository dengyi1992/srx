var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var superagent = require('superagent');
/* GET users listing. */
router.get('/', function(req, res, next) {
    superagent.get('http://m.xxxiao.com/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#blog-grid .thumb-link').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    title: $element.attr('alt'),
                    href: $element.attr('href')
                });
            });

            res.send(items);
        });
});

module.exports = router;
