const Router = require('koa-router');
const { verifAmend, hasAdminPermission } = require("../middleware/auth.middleware")
const { upload, create, update, removepic, offpic, onpic, findAll } = require("../controller/goods.controller");
const { validator } = require("../middleware/goods.middleware.ware");


const router = new Router({ prefix: "/goods" });

// 商品图片上传接口
router.post("/upload", verifAmend, hasAdminPermission, upload);

// 发布商品接口
router.post('/', verifAmend, hasAdminPermission, validator, create)

//修改商品接口
router.post('/arcadia', verifAmend, hasAdminPermission, validator, update);

// 删除图片 硬删除
router.post('/removepic', verifAmend, hasAdminPermission, removepic)

// 删除图片下架 软
router.post('/offpic', verifAmend, hasAdminPermission, offpic);
// 上架
router.post('/onpic', verifAmend, hasAdminPermission, onpic);

// 获取商品列表
router.post('/list', findAll);

module.exports = router;
