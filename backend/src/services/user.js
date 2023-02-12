/**
 * 用户业务操作
 */
const userModel = require('../models/user')

const user = {
  /**
   * 注册
   * @param {object} user  用户信息 
   * @returns             创建结果
   */
  async singUp(user) {
    let result = await userModel.create(user);
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
}