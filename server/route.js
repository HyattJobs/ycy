var express = require('express');
var router = express.Router();
var app = express();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://35.235.89.251:27017/';
router.get('/', function (req, res) {
	console.log("name");
    var selectData = function (db, callback) {
        var dbo = db.db("hpday");
        dbo.collection("wb").find({}).toArray(function(err, result) {
            if (err) 
                throw err;
            console.log(result);
            return res.send(result);
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