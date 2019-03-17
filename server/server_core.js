/*
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
app.use("/insert",route);

var server_core =app.listen(2300,function(req, res, next){
  var host = server_core.address().address
  var port = server_core.address().port
  console.log(__dirname);
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 })*/
/**

 *接收一个带参数的http请求
 * 127.0.0.1:3000/http_get
 * name=小小沉沉&password=qwer
 */

//导入http模块
var http=require('http');

//导入url模块
var url=require('url');
// var log=require('./log4js_readconfig');
var querystring = require("querystring");

http.createServer(function(request,response){
    request.setEncoding('utf-8');

    var postData = "";
    // 数据块接收中
    request.on("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    request.on("end", function () {
        console.log('数据接收完毕');
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
        console.log(params);
        console.log(params["name"]+"~~"+params["password"]);

        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
        response.write("======================================="+params["name"]+"~~"+params["password"]);
        response.write(util.inspect(params));
        response.end("数据提交完毕");
    });

}).listen(2300);
console.log("--HTTP NodeJS Connect--");