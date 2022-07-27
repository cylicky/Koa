const Router = require("koa-router");
const { userValidator, verifyUser ,crpyPassword,verifLogin} = require("../middleware/user.middleware")
const { register, login } = require("../controller/user.controller");

//默认地址前面先某一段连接
const router = new Router({ prefix: "/user" });
//注册接口
router.post("/register", userValidator, verifyUser,crpyPassword, register);
//登录接口
router.post("/login", userValidator,verifLogin,login);

module.exports = router;
