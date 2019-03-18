var PostData=require('./route/POST.js');
PostData({time: '1月11日 09:59iPhone客户端',
    content:'#2019%E7%81',
    photo:[ '//wx1.sinaimg.cn/orj360/006a0Rdhly1fz2ewkt0rhj30u0190k3a.jpg' ],
    video: '',
    review: {
        review_head : "review_head",
        review_time : "review_time",
        review_text : "review_text",
        review_img : "review_img",
    }
},"insert")