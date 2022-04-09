const IndexController = {};
// 导入模型
const query = require("../model/query")

IndexController.index = (req, res) => {
    res.render("index.html")
}

IndexController.systemData = async (req, res) => {
    const sql = `select * from settings`
    let result = await query(sql);
    res.json(result)
}

IndexController.editsettings = async (req, res) => {
    // 1、获取数据
    let { logoText } =req.body
    // 2、编辑sql,执行
    const sql = `update settings set name = 'logoText', val = '${logoText}' where name = 'logoText'`;
    
    let { affectedRows } = await query(sql)
    const delData = {
        code: "0",
        message: "add success"
    }
    const failData = {
        code: "1",
        fail: "add fail"
    }
    if (affectedRows > 0) {
        res.json(delData)
    } else {
        res.json(failData)
    }
}

module.exports = IndexController