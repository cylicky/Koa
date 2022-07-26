const { createUser } = require("../service/user.service");
const { } = require("../constant/err.type");
class UserController {
    async register(ctx, next) {
        //1.获取数据
        //  console.log(ctx.request.body);
        //2.操作数据库  转换成JSON数据
        const { user_name, password } = JSON.parse(ctx.request.body);
        const res = await createUser(user_name, password);
        try {
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
            ctx.app.emit('error', userRegisterErrot, ctx);
        }

    }

    async login(ctx, next) {
        const { user_name, password } = JSON.parse(ctx.request.body);
        // console.log(user_name, password);
        ctx.body = {
            code: 0,
            message: "登录成功",
            result: ""
        }
    }
}

module.exports = new UserController();