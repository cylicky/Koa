import Koa from "koa";
import Router from "koa-router";
const app = new Koa();
const router = new Router();
router.get("/", (ctx) => {
  ctx.body = {
    code: 0,
    msg: "hell koa",
  };
});
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3300, () => {
    console.log(`node  服务已经启动 http://localhost:3300`);
  });
