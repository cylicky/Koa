const Goods = require("../model/goods.model")
class GoodsService {
    // 添加
    async createGoods(goods) {
        const res = await Goods.create(goods);
        return res.dataValues;
    }
    // 修改
    async updataGoods(id, goods) {
        const res = await Goods.update(goods, { where: { id } })
        return res[0] > 0 ? true : false;

    }
    // 硬删除
    async removeGoods(id) {
        const res = await Goods.destroy({ where: { id } });
        //受影响的行数
        return res[0] > 0 ? true : false;
    }
    // 软删除
    async offpicGoods(id) {
        const res = await Goods.destroy({ where: { id } });
        //返回的是一个数值 0
        return res ? true : false;
    }
    async onpicGoods(id) {
        const res = await Goods.restore({ where: { id } });
        //返回的是一个数值 0
        return res ? true : false;
    }

    async findGoods(pageNum, pageSize) {
        //获取总数数据
        //    const count = await Goods.count();

        // 获取分页数据
        const offset = (pageNum - 1) * pageSize;
        //const rows = await Goods.findAll({offset:offset, limit: pageSize * 1 })
        // findAndCountAll 等同于 count+ findAll
        const { count, rows } = await Goods.findAndCountAll({ offset: offset, limit: pageSize * 1 })
        return {
            pageNum, pageSize, total: count,
            list: rows
        }
    }
}

module.exports = new GoodsService();