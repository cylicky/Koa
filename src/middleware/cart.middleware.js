const { cartFormatError } = require("../constant/err.type")
const validator = (rules) => {
    return async (ctx, next) => {
        try {
            if (typeof rules == "object") {
             
                ctx.verifyParams(rules)
            } else {
                return ctx.app.emit('error', cartFormatError, ctx)
            }

        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', cartFormatError, ctx)
        }
        await next();
    }
}

module.exports = {
    validator
}