const Articleontroller = {};
const { log } = require("console");
const path = require("path")
// 导入模型
const query = require("../model/query")
const viewsDir = path.join(path.dirname(__dirname), "views")

Articleontroller.catelist = (req, res) => {
    res.render("articlelist.html")
}

// 文章表渲染数据
Articleontroller.artiData = async (req, res) => {
    // 1.编辑sql语句
    let sql = `select * from article`
    // 2.执行sql语句
    let data = await query(sql)
    // 3.数据传给前端解构渲染(规范)
    const responseData = {
        data,
        code: 0,
        msg: "success"
    }
    res.json(responseData)
}
// 文章列表编辑数据
Articleontroller.artiUpdData = async (req, res) => {
    console.log(req.body);
    // return
    // 1、获取要编辑的数据
    const { id, title, content, author, status, add_date, pic, cate_id } = req.body;

    // 2、编写sql语句
    const sql = `update article set title = '${title}',content = '${content}',
    author = ${author},status = ${status},add_date = '${add_date}',pic = '${pic}',
    cate_id = ${cate_id} where id = ${id}`;
    // 3、执行sql语句，并且查看是否编辑成功
    let { affectedRows } = await query(sql)

    const successData = {
        code: "0",
        message: "update success"
    }
    const failData = {
        code: "1",
        fail: "update fail"
    }

    if (affectedRows > 0) {
        res.json(successData)
    } else {
        res.json(failData)
    }
}
// 文章列表删除数据
Articleontroller.artiDel = async (req, res) => {
    // 1、获取需要删除的数据
    const { id } = req.body;
    // 2、编写sql语句
    const sql = `delete from article where cate_id = ${id}`;
    // 3、执行sql语句并且给用户提示
    let { affectedRows } = await query(sql)
    const delData = {
        code: "0",
        message: "update success"
    }
    const failData = {
        code: "1",
        fail: "update fail"
    }
    if (affectedRows > 0) {
        res.json(delData)
    } else {
        res.json(failData)
    }

}
module.exports = Articleontroller
