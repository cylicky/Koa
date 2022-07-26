const Koa = require('koa');
const koaBody = require('koa-body');
const userRouter = require("../router/user.router")
const errHandler =require("./errHandler");
const app = new Koa();

//路由中间键  koaBody要在所有操作之前去运行
app.use(koaBody())
.use(userRouter.routes()).use(userRouter.allowedMethods())
.on('error',errHandler);
// app.use((ctx, next) => {
//     ctx.body = "hello Api";
// })
module.exports = app;
