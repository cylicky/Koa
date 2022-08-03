const fs = require("fs");
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');

const router = require("../router")
const errHandler = require("./errHandler");
const app = new Koa();

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
            // 获取后缀, 如: .js  .txt
            const reg = /\.[A-Za-z]+$/g
            const ext = file.originalFilename.match(reg)[0]
            //修改上传文件名
           file.filepath= path.join(__dirname, "../upload/") + Date.now() + ext;
        },
        onError(err) {
            console.log(err)
        }
    }
}))
    .use(router.routes())
    .use(router.allowedMethods())
    // 错误统一处理
    .on('error', errHandler);


module.exports = app;
