const IndexController = {};
const path = require('path')
// 导入模型
const query = require("../model/query")
const { rename, unlink } = require("../middleware/Asyrenaming")

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
    let { logoText } = req.body
    // 2、编辑sql,执行
    const sql = `update settings set name = 'logoText', val = '${logoText}' where name = 'logoText'`;

    let { affectedRows } = await query(sql)
    const delData = {
        logoText,
        code: "0",
        message: "add success",
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

IndexController.getsettin = async (req, res) => {
    let sql = `select * from settings`
    let result = await query(sql)
    res.json(result)
}

IndexController.textlogo = async (req, res) => {
    let { id } = req.query
    // 获取到上文的文件信息重命名
    if (req.file) {
        let { originalname, destination, filename } = req.file
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${originalname}`;
        await rename(oldPath, newPath)
        await unlink(id)
        // 将logo插入数据库
        let sql = `update settings set val = '${newPath}' where id = 2`
        await query(sql)
        res.json({
            newPath,
            code: 0,
            message: "upload success"
        })
    } else {
        res.json({
            code: -6,
            message: "upload fail",
        })
    }
}

module.exports = IndexController