var http = require('http');
var querystring = require('querystring');


var post_data={t:"t"};
var contents = post_data;

var options = {
    host:'localhost',
    port:2300,
    path:'/insert/insert',
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':null
    }
}

var req = http.request(options, function(res){
    res.setEncoding('utf8');
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    var _data='';
    res.on('data', function(chunk){
        _data += chunk;
    });
    res.on('end', function(){
        console.log("\n--->>\nresult:",_data)
    });
});

req.write(contents);
req.end;