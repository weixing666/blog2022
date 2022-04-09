const Articleontroller = {};
const path = require("path")
// 导入模型
const query = require("../model/query")
const viewsDir = path.join(path.dirname(__dirname), "views")

Articleontroller.catelist = (req, res) => {
    // res.sendFile(`${viewsDir}/articlelist.html`)
    res.render("articlelist.html")
}


module.exports = Articleontroller
