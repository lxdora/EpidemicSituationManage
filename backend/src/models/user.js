const dbUtils = require('../utils/db-utils')

const user = {
  /**
   * 
   * @param {object} model 用户数据模型 
   * @returns {object} mysql执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('user', model)
    return result;
  },

  /**
   * 
   * @param {object} options 获取用户信息 
   * @returns {object|null} 查找结果
   */
  async getUserInfo (options) {
    let _sql = ` select * from user where phone="${options.phone}" `
    let result = await dbUtils.query(_sql)
    if(Array.isArray(result) && result.length>0){
      result = result[0]
    }else{
      result = null
    }
    return result;
  },

  /**
   * 根据账号和密码查找用户信息
   * @param {object} options 
   * @returns 
   */
  async getOneByAccountAndPassword(options) {
    const _sql = `select * from user where account="${options.account} and password="${options.password}" limit 1`
    let result = await dbUtils.query(_sql)
    if(Array.isArray(result) && result.length>0){
      result = result[0]
    }else{
      result = null
    }
    return result;
  },

  async getUserList(options) {
    const _sql = `select * from user limit ${(options.page-1)*options.count}, ${options.count}`
    const result = await dbUtils.query(_sql);
    if(Array.isArray(result) && result.length>0){
      return result;
    }
    return []
  },
  async getUserCount() {
    const result = await dbUtils.count('user');
    console.log(result);
    return result[0].total_count;
  }

}

module.exports = user