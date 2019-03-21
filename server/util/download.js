//file download
var fs = require("fs");
var request = require("request");
var UUID = require('node-uuid');

//create file or dir
//var dirPath = path.join(__dirname, "file");

let DOWN = function(url,dirPath,subFix) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(`create ${dirPath} success.`);
    }
    let fileName = UUID.v1()+subFix;
    console.log(dirPath+fileName)
    let stream = fs.createWriteStream(dirPath+fileName);
    try {
        request(url).pipe(stream).on("close", function (err) {
            console.log("file [" + dirPath + fileName + "] download done");
        });
    }catch (e) {
        throw new Error(e+'un touch')
    }
    return fileName;
};

module.exports={
    DOWN:DOWN
};