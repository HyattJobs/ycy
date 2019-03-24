var http = require('http');
var querystring = require('querystring');

let PostData =  function(obj,url) {
    let reviews = encodeURI(JSON.stringify(obj.review));
    obj.review = reviews;
    let contents = querystring.stringify(obj);
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
            console.log(data);
            if(data === "true"){
                return PostData(obj,"insert");
            }
             // data;   //一段html代码
        });
    });

    try {
        req.write(contents);
        return req;
    }catch (e) {
    }finally {
        req.end;
    }
};

module.exports = PostData;