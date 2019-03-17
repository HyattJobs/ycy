//获取当前年份
let getCurrYear = function () {
    let od = new Date();
    return {
        YEAR : od.getFullYear(),
        MONTH : od.getMonth()+1,
        DAY : od.getDate(),
        HOUR : od.getHours(),
        MIN : od.getMinutes(),
        SEN : od.getSeconds(),
    }
};
//获取时间 发送的客户端
let getRealTime = function(time){
    let inx = time.lastIndexOf(":")+3;
    return {
        T_: time.substring(0, inx),
        F_:time.substring(inx,time.length)
    };
}
console.log(getCurrYear());