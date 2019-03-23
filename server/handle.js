// catch the content
 var fs = require('fs');
let puppeteer = require("puppeteer");
let {PATH} = require("./util/constant");
let {getCurrYear,getRealTime} = require("./util/time");
let PostData = require('./route/POST.js');
let {getPrefix,isNull,isEmptyObject} = require('./util/fileutil');
let {DOWN} = require('./util/download');

let url = "https://weibo.com/u/5644764907?www.520730.com=&is_hot=1#1552099793389";

if (!fs.existsSync(PATH.localPhoto)) {
    fs.mkdirSync(PATH.localPhoto);
    console.log(`create ${PATH.localPhoto} success.`);
}
if (!fs.existsSync(PATH.localVideo)) {
    fs.mkdirSync(PATH.localVideo);
    console.log(`create ${PATH.localVideo} success.`);
}
if (!fs.existsSync(PATH.localReview)) {
    fs.mkdirSync(PATH.localReview);
    console.log(`create ${PATH.localReview} success.`);
}
// await browser.close();
puppeteer.launch({
    executablePath:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless: false,
    args: [
        "--window-size=1920,1080"
    ]
}).then(async browser => {

    //open a new tag
    let newYcyPage = await browser.newPage(); // 设置浏览器信息
    const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/63.0.3239.84 Chrome/63.0.3239.84 Safari/537.36";
    newYcyPage.setUserAgent(UA);

    //await newYcyPage.setViewport({width:1920, height:1080});
    console.log("visit:\t"+url);
    // open the weibo
    await newYcyPage.goto(url);
    // <h1 class="username"> elements
    // await newYcyPage.waitFor("h1.username");
    await newYcyPage.waitForNavigation();
    // require jquery
    await newYcyPage.addScriptTag({
        url: "https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"
    });
    // for (let i = 2; i < 3; i++) {
    let count = 0;
    while(true){
        //#Pl_Official_MyProfileFeed__20 > div > div:nth-child(47) > div > span > a > em
        if(count < 100) {
            await newYcyPage.waitFor(100); // 单位是毫秒
            await newYcyPage.keyboard.down('PageDown');
            await newYcyPage.keyboard.down('End');
            count++;
        }else{
            break;
        }
    }
    for (let i = 0;i<10;i++){
        await newYcyPage.waitFor(200); // 单位是毫秒
        await newYcyPage.keyboard.down('PageDown');
        await newYcyPage.keyboard.down('End');
    }

    for (let j = 0; j < count*2; j++) {
        try {
            let reviewSpan = await newYcyPage.$(`#Pl_Official_MyProfileFeed__20 > div > div:nth-child(${j}) > div.WB_feed_handle > div > ul > li > a > span > span > span > em.ficon_repeat`);
            await reviewSpan.click();
        }catch (err) {}
    }
    //wait for the page
    try {
        page.waitForSelector($('#Pl_Official_MyProfileFeed__20 > div > div:nth-child(2) > div.WB_feed_handle > div.WB_feed_repeat > div.WB_repeat >div.WB_feed_publish > div.WB_publish > div.p_input > textarea'));
    }catch (err) {}
    await newYcyPage.waitFor(1000); //ms
    let wb_cont = await ycy_wb(newYcyPage);
    // download photos video head_img
    for (let wc of wb_cont){
        if (!isNull(wc.photo)){
            for (let pho of wc.photo){
                let photoHttp = getPrefix(pho);
                console.log("starting down loading ---- "+photoHttp);
                try{
                    pho = await DOWN(photoHttp,PATH.localPhoto,".jpg");
                }catch (e) {
                    console.log(e)
                }
            }
        };
        if (!isNull(wc.video)){
            let videoHttp = getPrefix(wc.video);
            console.log("starting down loading ---- "+videoHttp);
            try{
                wc.video = await DOWN(videoHttp,PATH.localVideo,".mp4");
            }catch (e) {
                console.log(e)
            }
        }
        try {
            console.log("starting down loading ---- "+getPrefix(wc.review.review_head));
            wc.review.review_head = await DOWN(getPrefix(wc.review.review_head),PATH.localReview,".jpg");
        }catch (e) {
            console.log(e)
        }
        try{
            console.log("starting down loading ---- "+getPrefix(wc.review.review_img));
            wc.review.review_img = await DOWN(getPrefix(wc.review.review_img),PATH.localReview,".jpg");
        }catch (e) {
            console.log(e)
        }
    }
    //writeJson();

   // console.log(wb_cont);
    if (wb_cont != null) {
        for (let wc of wb_cont) {
            if (!isEmptyObject(wc.time))
                PostData(wc, "insert");
        }
    }

});

let ycy_wb = async function(newYcyPage) {
    // get the wb content
    let wb_main_select = '#Pl_Official_MyProfileFeed__20 > div';
    let ycyWbList = await newYcyPage.evaluate((sel) => {
        console.log(sel);
        let catBoxs = Array.from($(sel).find('div.WB_cardwrap'));
        let ctn = catBoxs.map(v => {
            setTimeout(()=>{},200)
            let time = $(v).find('div.WB_feed_detail > div.WB_detail > div.WB_from > a').text().trim();
            let content = $(v).find('div.WB_feed_detail > div.WB_detail > div.WB_text').text().trim();
            let photo;
            let video = "";
            let review;
            try{
                //photo
                photo = Array.from($(v).find('div.WB_feed_detail > div.WB_detail > div.WB_media_wrap > div > ul > li')).map(w => {
                    let photoAdd = $(w).find("img").attr("src")
                    return photoAdd;
                });
            }catch (err) {}
            try {
                //video
                video = $(v).find("div.WB_feed_detail > div.WB_detail > div.WB_media_wrap > div > ul > li:eq(0) > div > div > video").attr("src");
            }catch (err) {}
            try{
                //review
                review = Array.from($(v).find("div.WB_feed_repeat > div > div > div.repeat_list > div.list_box > div.list_ul > div.list_li")).map(w =>{
                    let review_head;
                    try{
                        review_head = $(w).find("div.WB_face > a > img").attr("src");
                    }catch (err) {}
                    let review_text;
                    try{
                        review_text = $(w).find("div.list_con > div.WB_text").text();
                    }catch (err) {};
                    let review_img;
                    try{
                        review_img = $(w).find("div.list_con > div.WB_media_wrap > div > ul > li > img").attr("src");
                    }catch (err) {};
                    let review_time;
                    try{
                        review_time= $(w).find("div.list_con > div.WB_func > div.WB_from").text();
                    }catch (err) {};
                    return {
                        review_head : review_head,
                        review_time : review_time,
                        review_text : encodeURI(review_text),
                        review_img : review_img,
                    };
                });
            }catch (err) {};

            // let RealTime = getRealTime(time);
            return {
                time: time,//getCurrYear().YEAR+RealTime.T_+" "+RealTime.F_,
                content: encodeURI(content),
                photo: photo,
                video: video == null ? "": video,
                review: review
            };

        });
        return ctn;
    }, wb_main_select);
    return ycyWbList;
};



