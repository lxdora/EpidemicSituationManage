const userService = require('../services/user')
const userCode = require('../codes/user')

module.exports = {
  /**
   * 用户登录
   * @param {object} ctx 
   */
  async signIn (ctx) {
    const formData = ctx.request.body
    const result = userService.SinIn(formData);
    const res = {
      code: 200,
      message: '',
      result: null
    }
    if(result){
      if(formData.account === result.account) {
        res.result = result;
      }else {
        res.code = 1000
        res.message = userCode[1000]
      }
    }
    ctx.body =  res;
  },
  /**
   * 用户注册
   * @param {object} ctx 
   */
  async signUp (ctx) {
    const formData = ctx.request.body;
    const validator = userService.validatorSignUp(formData);
    const res = {
      code: 200,
      message: '',
      result: null
    }
    if(validator.flag){
      await userService.signUp();
      res.message = '注册成功'
      return res;
    }else{
      res.code = validator.code,
      res.message = validator.message;
    }
    ctx.body =  res;
  },
  async getUserList (ctx) {
    const formData = ctx.request.body;
    console.log(formData);
    const result = await userService.getUserList(formData);
    const total = await userService.getUserCount();
    ctx.body = {
      code: 200,
      message:'',
      result:{
        data: result,
        page_info: {
          page: formData.page,
          count: formData.count,
          total: total
        }
      }
    }
  },
  async getUserInfo(ctx){
    const formData = ctx.request.body;
    const result = await userService.getUserInfo(formData);
    ctx.body = {
      code: 200,
      message: '',
      result: result
    }
  }
}