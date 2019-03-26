var AipNlpClient = require("baidu-aip-sdk").nlp;

// 设置APPID/AK/SK
var APP_ID = "15836001";
var API_KEY = "on4LrVDERrwhvhIZyzzQF3y2";
var SECRET_KEY = "kayaD9917SOdMzxiWpdHubmKQ1EfyNdS";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipNlpClient(APP_ID, API_KEY, SECRET_KEY);

var text = "百度是一家高科技公司";

/*
// 调用词法分析
client.lexer(text).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});*/
var title = "超越又发微博了";

var content = decodeURI("%E6%8B%8D%E7%85%A7%E4%B9%9F%E9%9C%80%E8%A6%81%E5%A4%A9%E6%97%B6%E5%9C%B0%E5%88%A9%E4%BA%BA%E5%92%8C%E2%9D%A4%EF%B8%8F%20%E2%80%8B%E2%80%8B%E2%80%8B%E2%80%8B");
console.log(content);
/*
// 调用文章标签
client.keyword(title, content).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});*/
// 调用情感倾向分析
/*
client.sentimentClassify(content).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});*/

content = "麻省理工学院的研究团队为无人机在仓库中使用RFID技术进行库存查找等工作，创造了一种...";

var maxSummaryLen = 300;

/*
// 调用新闻摘要接口
client.newsSummary(content, maxSummaryLen).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});
*/


/*// 调用对话情绪识别接口
client.emotion(text).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});*/

// 调用文章标签
client.keyword(title, content).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});