var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://34.73.180.22:27017/";
MongoClient.connect(url, function(err, db) {
    if (err) 
        throw err;
    var dbo = db.db("hpday");
    dbo.collection("ycy_wb"). find({}).toArray(function(err, result) { // 返回集合中所有数据
    if (err) 
        throw err;
    console.log(result);
    db.close();
    });
});