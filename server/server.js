/*var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json())
//request body
app.get('/',function (req, res) {

});
*/
/*var server = app.listen(2300,function () {
	var host = server.address().address;
    var port = server.address().port;
    console.log('listening at %s', 'http://localhost:2300');
})
*/

var express=require('express');
//引入模块
var admin=require('./route.js');//路由，后台
//var index=require('./routes/index.js');//路由，首页
var app=express();
 
//app.use('/',index);//挂在路由，如果没有路由，或者只有/ ,映射到index路由；
app.use('/admin',admin);//挂在路由，/admin映射到admin
 
var server =app.listen(2300,function(req,res,next){
  var host = server.address().address
  var port = server.address().port
  console.log(__dirname);//这里的目录就是/Users/wofu/Desktop/node，其中node文件夹我是直接放在了桌面
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 })