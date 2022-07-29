const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError, jsonWebTokenError } = require("../constant/err.type")
const verifAmend = async (ctx, next) => {
    const { authorization } = ctx.request.header;
    try {
        if (authorization) {
            const token = authorization.replace("Bearer ", "");
            //user 包含了payload的信息(id,user_name,is_admin)
            const user = jwt.verify(token, JWT_SECRET);
            ctx.state.user = user;
        }

    } catch (error) {
        switch (error.name) {
            case "TokenExpiredError":
                console.error("token已过期", error);
                return ctx.app.emit("error", tokenExpiredError, ctx);
            case "JsonWebTokenError":
                console.error("无效的token", error);
                return ctx.app.emit("error", jsonWebTokenError, ctx);
        }
        console.error(error);
        return;
    }
    await next();
}
module.exports = {
    verifAmend
}