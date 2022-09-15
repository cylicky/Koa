const { fileUploadError, unSupportedFileType, pulishGoodsError, invalidGoodsID, removepicError, putawayError } = require('../constant/err.type');

const { createGoods, updataGoods, removeGoods, offpicGoods, onpicGoods, findGoods } = require("../service/goods.serveice")

class GoodsController {
    async upload(ctx) {
        const { file } = ctx.request.files;
        const fileTypes = ['image/jpeg', 'image/png'];

        if (file) {

            ctx.body = {
                code: '0',
                message: '商品图片上传成功',
                result: {
                    goods_img: file.newFilename
                }
            }
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error', unSupportedFileType, ctx);
            }


        }
        else {
            return ctx.app.emit('error', fileUploadError, ctx);
        }
    }
    async create(ctx) {
        // 直接调用service 的 createGoods 方法
        try {
            const { updatedAt, createdAt, ...res } = await createGoods(ctx.request.body);
            ctx.body = {
                code: 0,
                message: "发布成功",
                result: res
            }
        } catch (error) {
            console.log("error", error);
            return ctx.app.emit('erroe', pulishGoodsError, ctx);
        }

    }
    async update(ctx) {
        try {
            const { id, ...data } = ctx.request.body;
            const res = await updataGoods(id, data);
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoodsID, ctx)
            }

        } catch (error) {
            console.error(error);
        }
    }
    async removepic(ctx) {
        const { id } = ctx.request.body;
        const res = await removeGoods(id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '删除图片成功'
            }
        } else {
            return ctx.app.emit('error', removepicError, ctx)
        }

    }
    async offpic(ctx) {
        const { id } = ctx.request.body;
        const res = await offpicGoods(id);

        if (res) {
            ctx.body = {
                code: 0,
                message: '下架图片成功'
            }
        } else {
            return ctx.app.emit('error', removepicError, ctx)
        }
    }

    async onpic(ctx) {
        const { id } = ctx.request.body;
        const res = await onpicGoods(id);
        console.log(res);
        if (res) {
            ctx.body = {
                code: 0,
                message: '上架图片成功'
            }
        } else {
            return ctx.app.emit('error', putawayError, ctx)
        }

    }
    async findAll(ctx, next) {
        //1.解析 参数
        const { pageNum = 1, pageSize = 10 } = ctx.request.body;
        const res = await findGoods(pageNum, pageSize);
        ctx.body = {
            code: 0,
            message: '获取商品列表成功',
            result: res
        }
    }
}
module.exports = new GoodsController();