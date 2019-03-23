var a={"ba":"ba"};
var b=new Object();
function isEmptyObject(obj){
    for(var key in obj){
        return false
    };
    return true
};
if(isEmptyObject(a)){
  console.log("对象为空")
}
if(isEmptyObject(b)){
    console.log("b是个空对象")
}