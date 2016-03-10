var express = require('express');
var router = express.Router();
var util = require('util');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
/* 上传*/
router.post('/', multipartMiddleware, function(req, res) {
    console.log(req.body, req.files);
    var des_file = APP_PATH + "/public/" + req.files.userPhoto.originalFilename
    fs.readFile( req.files.userPhoto.path+"", function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            var response;
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:'http://192.168.199.127:3000/'+req.files.userPhoto.originalFilename
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
});

module.exports = router;