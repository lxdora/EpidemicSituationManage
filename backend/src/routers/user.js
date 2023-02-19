/**
 * restful api 子路由
 */

const Router = require('koa-router')
const userController = require('../controllers/user')

const router = new Router()
const routers = router
  .get('/:id', userController.getUserInfo)
  .post('/signIn', userController.signIn)
  .post('/signUp', userController.signUp)
  .get('/', userController.getUserList)
 
  
module.exports = routers