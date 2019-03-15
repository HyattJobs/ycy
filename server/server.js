var express = require('express');
var bodyParser = require("body-parser");
//引入模块
var route=require('./route.js');
var app=express();
 
//app.use(bodyParser.urlencoded({ extended: false }));
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/wb_data',route);
 
var server =app.listen(2300,function(req,res,next){
  var host = server.address().address
  var port = server.address().port
  console.log(__dirname);
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 })