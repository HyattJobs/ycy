var http = require('http');
var querystring = require('querystring');

let PostData = function(obj,url) {
    // console.log(obj);
    let reviews = querystring.stringify(obj.review);
    obj.review = reviews;
    // console.log(reviews);
    let contents = querystring.stringify(obj);
    // console.log(contents)
    // console.log(querystring.parse(contents));
    // console.log(contents);
    let options = {
        host: 'localhost',
        port: 2300,
        path: '/'+url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': contents.length
        }
    };

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            //console.log("insert success data:", data);   //一段html代码
        });
    });

    req.write(contents);
    req.end;
};

module.exports = PostData;