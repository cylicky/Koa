const path = require("path");
const fs = require("fs");

// 创建文件夹名字
function getUploadDirName() {
    const date = new Date();
    let month = Number.parseInt(date.getMonth()) + 1;
    month = month.toString().length > 1 ? month : `0${month}`;
    return `${date.getFullYear()}${month}${date.getDate()}`
}

//   判断文件是否存在，不存在就创建
function checkDirExist(file) {
    if (!fs.existsSync(file)) {
        fs.mkdirSync(file);
    }
}

// 获取上传文件的后缀
function getUploadFileExt(name_file) {
    // 获取后缀, 如: .js  .txt
    const reg = /\.[A-Za-z]+$/g
    const fileTypes = ['image/jpeg', 'image/png'];
  
    return name_file.match(reg)[0]

    // let ext = name_file.split('.');
    // return `.${ext[ext.length - 1]}`;


}

// 自定义文件名字
function getUploadFileName(ext) {
    return `${Date.now()}${ext}`;
}

module.exports = {
    getUploadDirName, checkDirExist, getUploadFileExt, getUploadFileName

}