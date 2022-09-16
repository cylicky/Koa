const { APP_PORT } = require("./config/config.default");
const app = require("./app/index.js");

let allowCrossDomain = (req, res, next) => {
    //请求源
    res.header("Access-Control-Allow-Origin", "*");
    //请求头 toke
    res.header("Access-Control-Allow-Headers", "*");
    //请求方法 put GET delete POST
    res.header("Access-Control-Allow-Methods", "*");
    next();
};


app.use(allowCrossDomain).listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`)
})