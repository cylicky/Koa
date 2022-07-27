const jwt = require("jsonwebtoken");
const { createUser, getUserInfo } = require("../service/user.service");
const { userRegisterError } = require("../constant/err.type");
const { JWT_SECRET } = require("../config/config.default");
class UserController {
    async register(ctx, next) {
        //1.获取数据

        //2.操作数据库  转换成JSON数据
        const { user_name, password } = ctx.request.body;
        console.log("添加" + password);
        try {
            const res = await createUser(user_name, password);
            // 3.返回结果
            ctx.body = {
                code: 0,
                message: "用户注册成功",
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        } catch (err) {
            console.log(err);
            //返回错误消息
            ctx.app.emit('error', userRegisterError, ctx);
            return;
        }

    }

    async login(ctx, next) {
        const { user_name } = ctx.request.body;
        //1 获取用户信息(在token的playload中,记录ID,user_name,is_admin)
        try {
            // 从返回结果对象中剔除 password 剩下的属性放在res对象里
            const { password, ...res } = await getUserInfo({ user_name });
            ctx.body = {
                code: 0,
                message: `用户登录成功`,
                result: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
                }
            }
        } catch (error) {
            console.error("用户登录失败", error)
        }


    }
}

module.exports = new UserController();