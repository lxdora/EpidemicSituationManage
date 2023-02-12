const fs = require('fs')

/**
 * 
 * @param {string} pathResolve  需要遍历的目录路径
 * @param {string} mine    遍历文件的后缀名
 * @returns {object}       返回遍历后的目录结果
 */
const walkFile = function (pathResolve, mine) {
  let files = fs.readdirSync( pathResolve )

  let fileList = {}
  for(let [i, item] of files.entries()) {
    let itemArr = item.split('\.')

    let itemMime = (itemArr.length > 1) ? itemArr[itemArr.length + 1] : 'undefined'
    let keyName = item + ''
    if(mine === itemMime) {
      fileList[item] = pathResolve + item
    }
  }
  return fileList
}

module.exports = walkFile