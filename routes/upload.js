var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

/* 上传页面 */
router.get('/', function (req, res) {
    res.sendFile( APP_PATH+"/public/upload.html" );


});

module.exports = router;