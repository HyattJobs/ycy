var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json())
//request body
app.get('/',function (req, res) {

});

var server = app.listen(2300,function () {
	var host = server.address().address;
    var port = server.address().port;
    console.log('listening at %s', 'http://localhost:2300');
})