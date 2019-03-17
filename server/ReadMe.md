## 后台主要内容
### - handle.js 主要是利用puppeteer爬取数据的类
#### 通过puppeteer.js爬取

  1. ycy的微博内容,以及评论的内容,存储到mongodb的hpday数据库的weibo_content,weibo_review集合里面,展示在页面的左上角也就是div_1区
  
  2. ycy的百度贴吧,以及评论的内容,存储到mongodb的hpday数据库的tieba_content,tieba_review集合里面,展示在页面的右上角也就是div_2区
  
  3. ycy的热点消息(即在百度,或google热搜的消息)存储到mongodb的hpday数据库的hot_content集合里面,展示在界面的右下角也就是div_4区
  
### - mongo.js 主要是存储数据的类,也可利用redis等数据库
#### 设置nodejs连接mongo的线程池,要不查询太慢

  1.query 方法,查询数据的方法
  
  2.add 方法,插入数据方法
  
  3.update 方法,修改数据方法
  
  4.del 方法,删除数据方法
  
  5.exist 方法,是否存在某一数据方法
 
### -server_core_core.js 服务类
 利用nodejs的express框架当做的服务器
 前台对应后台的接口
  > /data/weibo?data=xx?        #微博获取接口
  
  > /data/tieba?data=xx?        #贴吧获取接口
  
  > /data/hot?data=xx?          #热点消息获取接口
  
  > /mood/content?date=xx?      #心情内容获取接口
  
  > /timemachine/content?date=xx?      #时光机内容获取接口
  
  > /analysis/id=xx?          #分析数据接口
  * videoVal 短视频处理方法(照片有其对应的地址,但视频地址好像会失效,所以保存到本地)
### - analysis_ai.js 处理类
主要处理微博,贴吧的评论消息
利用百度ai的接口处理评论的消息,并把反馈的消息放置hpday数据库的weibo_mood,teiba_mood,weibo_index,teiba_index集合里面

## 前台
### 前台主要依赖jquery.js,animation.css等
前台大致分为4部分

div1:微博信息展示区

div2:贴吧信息展示区

div3:还没想好

div4:热点消息展示区

项目地址: https://github.com/HyattJobs/ycy

  
  
