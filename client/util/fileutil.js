// let pathOS=require('path');  /*nodejs自带的模块*/
// if (path != null){
let getPrefix= function(path){
        //     path = path.toString()
        // }
        // console.log(path);
        // if (path.toString().includes("http://")){
        //     return path;
        // } else{
        // }
        return "http:"+path;
    };
    /*getSuffix : function(path){
        return pathOS.extname(path);
    },*/
    let isNull = function (str) {
        if (str == null || str == "") {
            return true;
        } else {
            return false;
        }
    };
    let isEmptyObject = function (obj) {
        for (var key in obj){
            return false;
        }
        return true;
    };
    let getRealReview  = function (text) {
    let textLength = text.lastIndexOf("：");
    console.log(textLength)
    let nullLength = text.lastIndexOf("¡");
    return {
        nick: text.substring(0, textLength),
        text: text.substring(textLength, nullLength)
    };
}
