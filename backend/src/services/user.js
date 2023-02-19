/**
 * 用户业务操作
 */
const userModel = require('../models/user')

module.exports = {
  /**
   * 注册
   * @param {object} user  用户信息 
   * @returns             创建结果
   */
  async singUp(user) {
    let result = await userModel.create(user);
    return result
  },
  validatorSignUp(userInfo) {
    const result = {
      message: '',
      code: 200,
      flag: false
    }
    if(!userInfo.account){
      result.code = 1001;
      result.message = userCode[result.code]
      return result
    }
    if(userInfo.password!==userInfo.confirm_password) {
      result.code = 1002;
      result.message = userCode[result.code]
      return result
    }
    if(!userInfo.phone || !/^1[3-9]\d{9}$/.test(userInfo.phone)){
      result.code = 1003;
      result.message = userCode[result.code]
      return result
    }
    result.flag = true;
    return result
  },
  async getUserInfo(formData) {
    let result = await userModel.getUserInfo(formData)
    return result
  },
  /**
   * 登录
   * @param {object} formData 
   * @returns 
   */
  async singIn(formData) {
    const result = userModel.getOneByAccountAndPassword(formData)
    return result;
  },
  async getUserList(formData){
    formData.page = formData.page || 1;
    formData.count = formData.count || 10;
    const result = await userModel.getUserList(formData);
    return result;
  },
  async getUserCount () {
    const result = await userModel.getUserCount();
    return result;
  },
  async getUserInfo(formData){
    const result = await userModel.getUserInfo(formData);
    return result;
  }
}