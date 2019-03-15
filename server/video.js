//文件下载
var fs = require("fs");
var path = require("path");
var request = require("request");

//创建文件夹目录
var dirPath = path.join(__dirname, "file");
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log("文件夹创建成功");
} else {
    console.log("文件夹已存在");
}

//循环多线程下载
// for (let i = 0; i < 60; i++) {
   // let fileName = "out" + intToString(i, 3) + ".ts";
    // let url = "https://xxx.sdhdbd1.com/cb9/sd/gc/g1/670BC531/SD/" + fileName;
    let url = "http://f.us.sinaimg.cn/001IB7NNlx07r03xU2py01041200bgbQ0E010.mp4?label=mp4_720p&template=960x720.20.0&Expires=1552663557&ssig=IGjAvwMcsB&KID=unistore,video";
    let fileName = "ycy.mp4";
    let stream = fs.createWriteStream(path.join(dirPath, fileName));
    request(url).pipe(stream).on("close", function (err) {
        console.log("文件[" + fileName + "]下载完毕");
    });
// }

//整数转字符串，不足的位数用0补齐
function intToString(num, len) {
    let str = num.toString();
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}