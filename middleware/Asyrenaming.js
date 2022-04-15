const fs = require('fs')
// util可以把任何的异步函数封成promise形式
const { promisify } = require("util")
// 把fs.rename的回调函数转成promise形式
const rename = promisify(fs.rename)
const unlink = promisify(fs.unlink)

module.exports = { rename, unlink }
