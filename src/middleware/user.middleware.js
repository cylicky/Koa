const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const { userFormateError, UserAlreadyExited, userRegisterError,
    userDoesNotExist, userLoginError, invalidPassword } = require("../constant/err.type");
const userValidator = async (ctx, next) => {

    const { user_name, password } = ctx.request.body;
    // 合法性
    if (!user_name || !password) {
        console.log("123")
        console.error("用户名密码为空", ctx.request.body);
        ctx.app.emit("error", { userFormateError }, ctx);
        return;
    }
    await next();
}
const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body;

    try {
        const res = await getUserInfo({ user_name });
        //不为空 进入
        if (res) {
            console.error("用户名已存在", { user_name });
            ctx.app.emit("error", { UserAlreadyExited }, ctx);
            return;
        }
    } catch (error) {
        console.error("获取用户信息错误", error);
        ctx.app.emit("error", { userRegisterError }, ctx);
        return;
    }

    await next();
}

const crpyPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    const salt = bcrypt.genSaltSync(10);
    //hash 保存的是 密文
    const hash = bcrypt.hashSync(password, salt);

    ctx.request.body.password = hash;
    await next();
}
const verifLogin = async (ctx, next) => {
    const { user_name, password } = ctx.request.body;

    try {
        //1判断用户是否存在（不存在报错）
        const res = await getUserInfo({ user_name });

        if (!res) {
            console.log("用户不存在")
            console.error("用户名不存在", { user_name });
            ctx.app.emit("error", userDoesNotExist, ctx);
            return;
        }
        //2密码是否匹配（不匹配：报错）
        if (!bcrypt.compareSync(password, res.password)) {

            ctx.app.emit("error", invalidPassword, ctx);
            return;
        }
    } catch (error) {
        console.error(error);
        ctx.app.emit("error", userLoginError, ctx);
        return;
    }



    await next();

}
module.exports = {
    userValidator, verifyUser,
    crpyPassword, verifLogin
}