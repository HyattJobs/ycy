let express = require('express');
let router = express.Router();
var https = require('https');
let MongoClient = require('mongodb').MongoClient;
var querystring = require('querystring');
let {getPrefix,isNull,isEmptyObject} = require('./util/fileutil');
let access_token = "";
let database;
// baidu api
const param = querystring.stringify({
    'grant_type': 'client_credentials',
    'client_id': 'on4LrVDERrwhvhIZyzzQF3y2',
    'client_secret': 'kayaD9917SOdMzxiWpdHubmKQ1EfyNdS'
});

// let DB_URL = 'mongodb://35.235.89.251:27017/';
let DB_URL = 'mongodb://localhost:27017/';
let DB_CODE = "hpday";
let CONN_CODE = "wb";
//启动时连接数据库 {useNewUrlParser: true}
MongoClient.connect(DB_URL, { useNewUrlParser: true },function (err, db) {
    if (err)
        throw err;
    console.log(`database ${DB_URL} connect success！`);
    database = db;
});

router.get("/apitoken",function (request,response) {
    https.get(
        {
            hostname: 'aip.baidubce.com',
            path: '/oauth/2.0/token?' + param,
            agent: false
        },
        function (res) {
            res.setEncoding('utf8')
            res.on('data',function (data) {
                //取得access_token
                 access_token = JSON.parse(data).access_token
                response.send(JSON.parse(data))
            });
            // res.end
        }
    );
})

router.get("/useran",function (req,res) {
    let  options = {
        host: 'aip.baidubce.com',
        path: '/rpc/2.0/nlp/v1/lexer?access_token=24.9481b0b6b77939664368953af6e4dade.2592000.1556017322.282335-15836001',//+access_token,
        method: 'POST',
        headers: {
            //x-www-form-urlencoded
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    console.log(options);
    // querystring.unescape();
    let contents = querystring.stringify(
        {
            text: "hi"
        }
    );
    console.log(contents);
    let req_baidu = https.request(options, function (res_baidu) {
        //res_baidu.setEncoding('utf8')
        res_baidu.on('data', function (chunk) {
            //百度返回来的数据，有得分，直接发给html，在html中处理
            res.send(chunk)
        })

    })
    req_baidu.write(contents);
    req_baidu.end()
})

router.post('/isContains', function (req, res) {
    let dbo = database.db(DB_CODE);
    let data = {
        time: req.body.time
    };
    // console.log(data);
    //查询微博数据
    dbo.collection(CONN_CODE).find(data).toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        // console.log(isEmptyObject(result));
        if(isEmptyObject(result)){
            return res.send("true");
        }else {
            return res.send("false");
        }
    });
    //console.log(req.body);
    // return res.send(JSON.stringify({}));
});

router.get('/wb_data', function (req, res) {
    let dbo = database.db(DB_CODE);
    //查询微博数据
    dbo.collection(CONN_CODE).find({}).sort({"time":-1}).limit(1).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        return res.send(result);
    });
});

router.post('/insert', function (req, res) {
    let dbo = database.db(DB_CODE);
    // let reviews = ;
    // console.log(reviews)
    let data = {
        time: req.body.time,
        content:req.body.content,
        photo:req.body.photo,
        video: req.body.video,
        review: JSON.parse(decodeURI(req.body.review))
    };
    dbo.collection(CONN_CODE).insertOne(data,function(err,result){
        if (err) throw err;
        console.log(result.result.ok);
    });
    //console.log(req.body);
    return res.send(JSON.stringify(data));
});

module.exports = router;