let express = require('express');
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;
var querystring = require('querystring');
let database;

let DB_URL = 'mongodb://35.235.89.251:27017/';
let DB_CODE = "hpday";
let CONN_CODE = "wb";
console.log("start server")
//启动时连接数据库 {useNewUrlParser: true}
MongoClient.connect(DB_URL, function (err, db) {
    if (err)
        throw err;
    console.log("database connect success！");
    database = db;
});

router.get('/wb_data', function (req, res) {
    let dbo = database.db(DB_CODE);
    //查询微博数据
    dbo.collection(CONN_CODE).find({}).sort({"time":-1}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        return res.send(result);
    });
});

router.post('/insert', function (req, res) {
    let dbo = database.db(DB_CODE);
    let reviews = JSON.parse(decodeURI(req.body.review));
    let data = {time: req.body.time,
        content:req.body.content,
        photo:req.body.photo,
        video: req.body.video,
        review: {
            review_head : reviews.review_head,
            review_time : reviews.review_time,
            review_text : reviews.review_text,
            review_img :  reviews.review_img,
        }
    };
    dbo.collection(CONN_CODE).insertOne(data,function(err,result){
        if (err) throw err;
        console.log(result.result.ok);
    });
    //console.log(req.body);
    return res.send(JSON.stringify(data));
});

module.exports = router;