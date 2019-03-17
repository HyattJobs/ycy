var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var database;

var DB_URL = 'mongodb://35.235.89.251:27017/';
var DB_NAME = "hpday";

//启动时连接数据库
MongoClient.connect(DB_URL, {useNewUrlParser: true}, function (err, db) {
    if (err)
        throw err;
    console.log("连接成功！");
    database = db;
});

router.get('/', function (req, res) {
    var dbo = database.db(DB_NAME);
    dbo.collection("wb").find({}).toArray(function (err, result) {
        if (err)
            throw err;
        console.log(result);
        return res.send(result);
    });
});

router('/insert', function (req, res) {
    console.log(req.query.www);
    return res.send(req.query.www);
});

module.exports = router;