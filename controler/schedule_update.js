/**
 * Created by deng on 16-3-17.
 */
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
var mysql = require('mysql');
var  request= require('request');
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'dengyi',
    database:'srx',
    port:3306
});
var times = [];

for (var i = 0; i < 60; i=i+1) {
    times.push(i);
}
rule.minute = times;
var options = {
    method: 'GET',
    encoding:null,
    url: 'http://localhost:3000/crawler'
};
schedule.scheduleJob(rule, function () {
   //去数据库里面查询是否有在五分钟内会执行的任务

    request(options, function (error, response, body) {
        console.log(new Date());
    });
});
