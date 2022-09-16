// 购物车
// 1导入路由
const Router = require("koa-router");

// 中间件
const { verifAmend } = require("../middleware/auth.middleware")
const { validator } = require("../middleware/cart.middleware")
const { CartAdd, findAll, proDuctid,proDuctDel } = require("../controller/cart.controller")

// 2实例化路由对象
const router = new Router({ prefix: '/carts' })

//3 编写路由   登录验证，验证数据
// 添加到购物车
router.post('/', verifAmend, validator({ goods_id: 'number' }), CartAdd)

// 获取购物车列表
router.post('/productlist', verifAmend, findAll)

// 更新购物车
router.post('/productid', verifAmend, validator({
    number: { type: 'number', required: false },
    select: { type: 'bool', required: false }
}), proDuctid)
// 删除购物车
router.post('/productdel', verifAmend, proDuctDel);

// 4 导出router 对象
module.exports = router;
