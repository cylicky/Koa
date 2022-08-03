class GoodsController {
    async upload(ctx, next) {
        console.log("123")
        ctx.body = {
            code: "0",

        }
    }
}
module.exports = new GoodsController();