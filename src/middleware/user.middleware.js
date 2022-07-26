const { getUserInfo } = require("../service/user.service");
const {userFormateError,UserAlreadyExited} =require("../constant/err.type")
const userValidator = async (ctx, next) => {
    const { user_name, password } = JSON.parse(ctx.request.body);
    // 合法性
    if (!user_name || !password) {
        console.error("用户名密码为空", ctx.request.body);
        ctx.app.emit("error",{userFormateError},ctx);
       
        return;
    }
    await next();
}
const verifyUser = async (ctx, next) => {
    const { user_name, password } = JSON.parse(ctx.request.body);
   
    // 合理性
    if ( await getUserInfo({ user_name })) {
        ctx.app.emit("error",{UserAlreadyExited},ctx);
        return;
    }
    fetch
    await next();
}

module.exports = {
    userValidator, verifyUser
}