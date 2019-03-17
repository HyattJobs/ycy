//file download
var fs = require("fs");
var path = require("path");
var request = require("request");
var UUID = require('node-uuid');

//create file or dir
var dirPath = path.join(__dirname, "file");
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log(`create ${dirPath} success.`);
} else {
    console.log(`${dirPath} already exists.`);
}
console.log(UUID.v1());
////f.us.sinaimg.cn/001IB7NNlx07r03xU2py01041200bgbQ0E010.mp4?label=mp4_720p&template=960x720.20.0&Expires=1552816791&ssig=KlYNnJT%2FJ0&KID=unistore,video
// let url = "http://f.us.sinaimg.cn/001IB7NNlx07r03xU2py01041200bgbQ0E010.mp4?label=mp4_720p&template=960x720.20.0&Expires=1552663557&ssig=IGjAvwMcsB&KID=unistore,video";
// let fileName = "ycy.mp4";
// let stream = fs.createWriteStream(path.join(dirPath, fileName));
// request(url).pipe(stream).on("close", function (err) {
//     console.log("文件[" + fileName + "]下载完毕");
// });