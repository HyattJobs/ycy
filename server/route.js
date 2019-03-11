var express = require('express');
var router = express.Router();
var app = express();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://35.235.89.251:27017/';
router.get('/', function (req, res) {
	//res.send('Hello World');
	console.log("name");
    var selectData = function (db, callback) {
        // //连接到表
        // //var dbo = db.db("hpday");
        // var collection = db.collection('wb');
        // //查询数据
        // var whereStr = {"name": '菜鸟教程'};
        // collection.find({}).toArray(function (err, result) {
        //     console.log(error);
        //     console.log(result);
        //     return res.send(result);
        //     //return res.jsonp(result);
        // });
       
        var dbo = db.db("hpday");
        dbo.collection("wb").find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) 
                throw err;
            console.log(result);
            return res.send(result);
            //return result;
        });
    }

    MongoClient.connect(DB_CONN_STR, function (err, db) {
        console.log("连接成功！");
        selectData(db, function (result) {
            db.close();
        });
    });
})

module.exports = router;