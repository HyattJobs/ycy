module.exports = {
    //获取当前年份
    getCurrYear: function () {
        let od = new Date();
        let mon = od.getMonth() + 1;
        return {
            YEAR: od.getFullYear(),
            MONTH: (mon) < 10 ? ("0"+mon):mon,
            DAY: od.getDate(),
            HOUR: od.getHours(),
            MIN: od.getMinutes(),
            SEN: od.getSeconds(),
        }
    },
    //获取时间 发送的客户端
    getRealTime: function (time) {
        let inx = time.lastIndexOf(":") + 3;
        return {
            T_: time.substring(0, inx),
            F_: time.substring(inx, time.length)
        };
    }
}
// export {getCurrYear,getRealTime};
// console.log(getCurrYear());