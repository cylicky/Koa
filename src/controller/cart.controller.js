const { createOrUpdate, findCarts, proDuctidUpdateCarts, proDuctDelete } = require("../service/cart.serveice")

const { cartFormatError, proDuctError } = require("../constant/err.type")

class CartController {
    async CartAdd(ctx) {
        //获取账号ID
        const user_id = ctx.state.user.id;
        //  商品ID 
        const { goods_id } = ctx.request.body;
        // 操作数据库
        const res = await createOrUpdate(user_id, goods_id);

        // 返回结果
        ctx.body = {
            code: 0,
            message: '添加到购物车成功',
            result: res
        }
    }
    async findAll(ctx) {

        const { pageNum = 1, pageSize = 10 } = ctx.request.body;
        const res = await findCarts(pageNum, pageSize);
        ctx.body = {
            code: 1,
            message: '获取购物车列表成功',
            result: res
        }

    }

    async proDuctid(ctx) {

        const { id, number, selected } = ctx.request.body;
        const mun = Math.sign(number) == -1 ? 0 : number;
       
        if (!id) {
            cartFormatError.message = "ID不能同事为空";
            return ctx.app.emit('error', cartFormatError, ctx);
        }

        // 操作数据库
        const res = await proDuctidUpdateCarts({ id, mun, selected });
        ctx.body = {
            code: 0,
            message: "更新购物车成功",
            result: res
        }


    }
    async proDuctDel(ctx) {
        const { id } = ctx.request.body;
        const res = await proDuctDelete(id);
        if (res) {
            ctx.body = {
                code: 0,
                message: "删除商品成功",
                result: res
            }
        } else {
            ctx.app.emit('error', proDuctError);
        }
    }
}

module.exports = new CartController();