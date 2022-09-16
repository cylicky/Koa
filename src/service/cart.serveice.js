const { Op } = require("sequelize")
const Cart = require("../model/cart.model")
const Goods = require("../model/goods.model")

class CartService {
    async createOrUpdate(user_id, goods_id) {
        const res = await Cart.findOne({
            where: {
                [Op.and]: {
                    user_id, goods_id
                }
            }
        })
        if (res) {
            // 已经存在一条记录，将number+ 1
            await res.increment('number');
            return await res.reload();
        } else {
            return await Cart.create({
                user_id, goods_id
            })
        }

    }
    async findCarts(pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize;
        const { count, rows } = await Cart.findAndCountAll({
            attributes: ['id', 'number', 'selected'],
            offset: offset,
            limit: pageSize * 1,
            include: {
                model: Goods,
                as: "goods_info",
                attributes: ['id', 'goods_price', 'goods_num', 'goods_img']
            }
        })
        return {
            pageNum, pageSize, total: count,
            list: rows
        }

    }
    async proDuctidUpdateCarts(params) {
        const { id, mun, selected } = params;
        const res = await Cart.findByPk(id);
        if (!res) return '';
        (res.number = (res.number - mun > 1 ? res.number - mun : 0))
        if (selected !== undefined) {
            res.selected = selected;
        }
        return await res.save();
    }

    async proDuctDelete(id) {
        return  await Cart.destroy({
            where: {
                id: {
                    [Op.in]: id
                }
            }
        })

    }
}

module.exports = new CartService();