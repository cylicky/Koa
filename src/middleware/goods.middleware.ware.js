const { goodsFormatError } = require("../constant/err.type")

const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_name: { type: "string", requuird: true },
            goods_price: { type: "number", requuird: true },
            goods_num: { type: "number", requuird: true },
            goods_img: { type: "string", requuird: true }
        })
    } catch (error) {
        console.log(error);
        goodsFormatError.result = error;
        return ctx.app.emit('error', goodsFormatError, ctx);
    }
    await next();
}


module.exports = {
    validator
}
