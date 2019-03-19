//file download
var fs = require("fs");
var path = require("path");
var request = require("request");
var UUID = require('node-uuid');

//create file or dir
//var dirPath = path.join(__dirname, "file");

let DOWN = async function(url,dirPath,subFix) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(`create ${dirPath} success.`);
    }
    let fileName = UUID.v1()+subFix;
    let stream = fs.createWriteStream(path.join(dirPath, fileName));
    try {
        await request(url).pipe(stream).on("close", function (err) {
            console.log("file [" + dirPath + fileName + "] download done");
        });
    }catch (e) {
        throw new Error('un touch')
    }
    return fileName;
};

module.exports={
    DOWN:DOWN
};