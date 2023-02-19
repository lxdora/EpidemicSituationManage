const Router = require('koa-router')
const router = Router();
const user = require('./user')

router.use('/user', user.routes(), user.allowedMethods())
module.exports = router;

