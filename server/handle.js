const puppeteer = require('puppeteer');
(async ()=>{
    try{
        // 创建一个浏览器实例 Browser 对象
        let browser = await puppeteer.launch({
            // 是否不显示浏览器， 为true则不显示
            'headless': false,
        });
        // 通过浏览器实例 Browser 对象创建页面 Page 对象
        let page = await browser.newPage();
        // 设置浏览器信息
        const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/63.0.3239.84 Chrome/63.0.3239.84 Safari/537.36";
        await Promise.all([
            page.setUserAgent(UA),
            // 允许运行js
            page.setJavaScriptEnabled(true),
            // 设置页面视口的大小
            page.setViewport({width: 1100, height: 1080}),
        ]);
        // 地址
        let chapter_list_url = `https://www.douban.com/search?q=%E6%9D%A8%E8%B6%85%E8%B6%8A`
        // 打开章节列表
        await page.goto(chapter_list_url);
        // 使用css选择器的方式
        let content= await page.$eval('#content > div > div.article > div.search-result > div:nth-child(3) > div:nth-child(1) > div.content > div > h3', el => el.innerText);
        console.log(content);
    }catch(err){
        console.log(err)
    }
})()