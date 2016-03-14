var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({msg:'success',message:'这是任务定制接口'});

});

module.exports = router;
