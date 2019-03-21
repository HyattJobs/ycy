var express = require('express');
var index = express.Router();
index.get('/', function (req, res) {
    var selectData = function (db, callback) {
        return res.send();
    }
    selectData("","");
})

module.exports = index;