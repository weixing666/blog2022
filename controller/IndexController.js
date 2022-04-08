const IndexController = {};
const path = require("path")
// 导入模型
const query = require("../model/query")
const viewsDir = path.join(path.dirname(__dirname), "views")
IndexController.index = (req, res) => {
    res.sendFile(`${viewsDir}/index.html`)
}

IndexController.login = (req, res) => {
    res.sendFile(`${viewsDir}/login.html`)
}

module.exports = IndexController