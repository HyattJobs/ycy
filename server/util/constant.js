let OS = require('os');
let {getCurrYear,getRealTime}  = require('./time');
let sysType = OS.type();
let date = getCurrYear();
//system kernel
let sysKernel = "";
let localPhoto = "";
let localVideo = "";
let localReview = "";

if (sysType === "Windows_NT") {
    sysKernel = "WIN";
    localPhoto = "D:/data/photo/"+date.YEAR+date.MONTH+date.DAY+"/";
    localVideo = "D:/data/video/"+date.YEAR+date.MONTH+date.DAY+"/";
    localReview = "D:/data/review/"+date.YEAR+date.MONTH+date.DAY+"/";
} else if (sysType === "Darwin") {
    sysKernel = "MAC";
} else {
    sysKernel = "LINUX";
}

let PATH = {
    localPhoto: localPhoto,
    localVideo: localVideo,
    localReview: localReview,
    sysKernel: sysKernel
};
module.exports = {
    PATH:PATH
}
//export {PATH}