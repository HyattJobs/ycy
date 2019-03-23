// let pathOS=require('path');  /*nodejs自带的模块*/
module.exports= {
// if (path != null){
getPrefix : function(path){
        //     path = path.toString()
        // }
        // console.log(path);
        // if (path.toString().includes("http://")){
        //     return path;
        // } else{
        // }
        return "http:"+path;
    },
    /*getSuffix : function(path){
        return pathOS.extname(path);
    },*/
    isNull : function (str) {
        if (str == null || str == "") {
            return true;
        } else {
            return false;
        }
    },
    isEmptyObject:function (obj) {
        for (var key in obj){
            return false;
        }
        return true;
    }

}