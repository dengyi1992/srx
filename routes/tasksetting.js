var express = require('express');
var querystring = require('querystring');
var util = require('util');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'dengyi',
    database:'srx',
    port:3306
});
conn.connect();
router.use(bodyParser.urlencoded({
    extended: true
}));
router.post('/', function(req, res, next) {
    if (req.body.url==undefined||req.body.interfacename==undefined||req.body.description==undefined||req.body.cycle==undefined||req.body.ifopen==undefined){
        res.json({msg:'params err',content:'参数异常'});
        return;
    }
    var  TaskSelect = 'SELECT * FROM tasksetting WHERE interfacename =?';
    var  selectParams =[req.body.interfaceurl];
    conn.query(TaskSelect,selectParams,function(err, rows, fields){
        if (err) {
            res.json({msg:'err',content:'数据库错误'});

        };
        if (rows.length>=1){
            //更新处理
            var updateTask = 'UPDATE tasksetting SET description=?,cycle=?,ifopen=? WHERE interfacename=?';
            var updateParams = [req.body.description,req.body.cycle,req.body.ifopen,req.body.interfacename];
            conn.query(updateTask,updateParams,function(err,rows,fields){
                if (err){
                    res.json({msg:'err',content:'更新失败'});
                }
                res.json({msg:'success',content:'更新成功'});
            });


        }else {
            //插入处理
            var insertNewTask = 'insert tasksetting (interfacename, description, cycle, ifopen) VALUES (?,?,?,?)';
            var insertTaskParams =[req.body.interfacename,req.body.description,req.body.cycle,req.body.ifopen];
            conn.query(insertNewTask,insertTaskParams,function(err,rows,fields){
               if (err){
                   res.json({msg:'err',content:'新增失败'});
               }
                res.json({msg:'success',content:'新增成功'});
            });

        }

    });

});

module.exports = router;
