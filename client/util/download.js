//file download
var fs = require("fs");
var request = require("request");
var UUID = require('node-uuid');

//create file or dir
//var dirPath = path.join(__dirname, "file");

let DOWN = function(url,dirPath,subFix) {
    let fileName = UUID.v1()+subFix;
    // console.log("starting ---- "+dirPath+fileName);
    let stream = fs.createWriteStream(dirPath+fileName);
    try {
        request({
            url:url,
            headers: {
                        Accept: '*/*',
                        'Accept-Encoding': 'gzip, deflate',
                        Connection: 'keep-alive',
                        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
                    }
            }
            ).pipe(stream).on("close", function (err) {
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