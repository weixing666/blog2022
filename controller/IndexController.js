const IndexController = {};
const path = require("path")
// 导入模型
const query = require("../model/query")

IndexController.index = (req, res) => {
    res.render("index.html")
}

IndexController.login = (req, res) => {
    res.render("login.html")
}


module.exports = IndexController