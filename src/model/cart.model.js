// 1 导入 sequelize 连接
const { DataTypes } = require("sequelize")
// 2 定义数据模型
const seq = require("../db/seq")

// 需要关联表
const Goods = require("./goods.model");

const Cart = seq.define("zd_Carts", {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品的ID'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户ID'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '商品数量'
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否选中'
    }

})

// 3同步数据建表
//Cart.sync({ force: true });

Cart.belongsTo(Goods, {
    // 外键
    foreignKey: 'goods_id',
    as: 'goods_info'
})
// 4 导出Cart模型
module.exports = Cart