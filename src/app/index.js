const fs = require("fs");
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');

const router = require("../router")
const errHandler = require("./errHandler");
const { getUploadDirName, checkDirExist, getUploadFileExt, getUploadFileName } = require("../utils/uploadConfig")
const app = new Koa();


// 检测用户传过来的数据格式
parameter(app);
//路由中间键  koaBody要在所有操作之前去运行
app.use(koaBody({
    multipart: true,
    formidable: {
        // 上传存放的路劲 
        uploadDir: path.join(__dirname, '../upload'),
        // 保持后缀名\
        keepExtensions: true,
        // 文件大小
        // maxFileSize: 5000,
        onFileBegin: (name, file) => {
            //获取文件后缀
            const ext = getUploadFileExt(file.originalFilename);
            const dir = path.join(__dirname, `../upload/${getUploadDirName()}`)
            checkDirExist(dir);
            //修改上传文件名
            const fileName = getUploadFileName(ext)
            file.filepath = `${dir}\\${fileName}`
            // 重新定义路径赋值给 newFilename
            file.newFilename = `/${getUploadDirName()}/${fileName}`;
        },
        onError(err) {
            console.log(err)
        }
    }
}))
    .use(KoaStatic(path.join(__dirname, "../upload/")))
    .use(router.routes())
    .use(router.allowedMethods())
    // 错误统一处理
    .on('error', errHandler);


module.exports = app;
