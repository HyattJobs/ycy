let puppeteer = require("puppeteer");
let ycy_wb = async function(url,code) {
    console.log(url+code);
    // open a brower
    let browser = await puppeteer.launch({
        executablePath:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        //headless: false,
        // args: [
        //     "--window-size=1920,1080"
        // ]
    });

    // 开一个新的页签
    let newYcyPage = await browser.newPage();
    await newYcyPage.setViewport({width:1920, height:1080});
    // open the weibo
    await newYcyPage.goto(url);
    
    // <h1 class="username"> elements
    await newYcyPage.waitFor("h1.username");
    await newYcyPage.waitFor(3000); // 单位是毫秒
    // require jquery
    await newYcyPage.addScriptTag({
        url: "https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"
    });
    
     // 获取车源列表
    let CAR_LIST_SELECTOR = '#Pl_Official_MyProfileFeed__20 > div';
    //let CAR_LIST_SELECTOR = '#Pl_Official_MyProfileFeed__20 > div > div:nth-child(2) > div.WB_feed_detail.clearfix > div.WB_detail > div.WB_media_wrap.clearfix';
    console.log("开始搜寻界面内容");
    let ycyWbList = await newYcyPage.evaluate((sel) => {
        console.log(sel);
        let catBoxs = Array.from($(sel).find('div.WB_cardwrap'));
        console.log(catBoxs.length);
        let ctn = catBoxs.map(v => {
            let time = $(v).find('div.WB_feed_detail > div.WB_detail > div.WB_from').text().replace(/[\r\n]/g, "").trim();
            let content = $(v).find('div.WB_feed_detail > div.WB_detail > div.WB_text').text().replace(/[\r\n]/g, "").trim();
            let photo;//{};// $('#Pl_Official_MyProfileFeed__20 > div > div:nth-child(2) > div.WB_feed_detail.clearfix > div.WB_detail > div.WB_media_wrap.clearfix > div > ul > li > img').attr("src");
            try{
                photo = Array.from($(v).find('div.WB_feed_detail > div.WB_detail > div.WB_media_wrap.clearfix > div > ul > li')).map(w => {
                    let photoAdd = $(w).find("img").attr("src");
                    return photoAdd;
                });
            }catch(err){}
            return {
                time: time,
                content: content,
                photo:photo
            };
        });
        return ctn;
    }, CAR_LIST_SELECTOR);

    // // get page
    // let result = await newYcyPage.evaluate(() => {
    //     let ret;
    //     try {
    //         ret = $("#Pl_Official_MyProfileFeed__20 > div").html();
    //     } catch (err) {
    //         ret = err.message;
    //     }
    //     return ret;
    // });

    console.log(ycyWbList);

    await browser.close();    
};

ycy_wb("https://weibo.com/u/5644764907?www.520730.com=&is_hot=1#1552099793389","");