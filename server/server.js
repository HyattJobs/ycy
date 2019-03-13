var express=require('express');
//引入模块
var route=require('./route.js');
var app=express();
 
app.use('/',route);
 
var server =app.listen(2300,function(req,res,next){
  var host = server.address().address
  var port = server.address().port
  console.log(__dirname);
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 })