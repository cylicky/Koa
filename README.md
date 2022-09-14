 # 配置ES6 语法糖能使用的环境

npm install @babel/core @babel/cli @babel/preset-env @babel/register @babel/node @babel/plugin-transform-runtime

根目录 创建 .babelrc   文件
```
 {
    "presets": ["@babel/preset-env"],
    "plugins": [
      ["@babel/plugin-transform-runtime"]
    ]
  }
```

src 目录下创建index.js 文件

```
require('@babel/register')
require('./app.js');
```




重启项目

mysql   password  cy123456  



 # 一项目初始化

## 1初始化项目

```
npm init -y
```

生成package.json 文件:

## 2 git 初始化

```
git init
```

生成.get 隐藏文件夹，git 仓库

## 3创建ReadMe 文件

# 二.搭建项目

## 1 安装Koa 框架

``` 
npm install Koa
```

## 2 编写最基本的APP

```
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

```

## 3 安装热加载库

```
npm install nodemon
```

在 package.json 文件里面 配置 启动文件

```
{
  "dependencies": {
    "@babel/cli": "^7.18.10",
    "@babel/core": "^7.18.13",
    "@babel/node": "^7.18.10",
    "@babel/plugin-transform-runtime": "^7.18.10",
    "@babel/preset-env": "^7.18.10",
    "@babel/register": "^7.18.9",
    "koa": "^2.13.4",
    "koa-body": "^5.0.0",
    "koa-router": "^12.0.0",
    "sequelize": "^6.21.4"
  },
  "scripts": {
    "serve": "nodemon src/index.js"
  },
  "devDependencies": {
    "nodemon": "^2.0.19"
  }
}

```

终端启动服务 npm server







