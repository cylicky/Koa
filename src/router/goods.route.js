const Router = require('koa-router');
const { verifAmend, hasAdminPermission } = require("../middleware/auth.middleware")
const { upload } = require("../controller/goods.controller");


const router = new Router({ prefix: "/goods" });

router.post("/upload", verifAmend, hasAdminPermission, upload);

module.exports = router;
