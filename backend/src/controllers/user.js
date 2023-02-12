const userService = require('../services/user')

module.exports = {
  async SinIn (ctx) {
    const formData = ctx.request.body
    const result = userService.SinIn(formData);
    
  }
}