const CateController = {};
const { log } = require("console");
const path = require("path")
// 导入模型
const query = require("../model/query")

CateController.catelist = (req, res) => {
    res.render("catelist.html")
}

// 渲染数据
CateController.cateData = async (req, res) => {
    // 1、编写sql查询数据
    const sql = `select * from category`
    // 2、执行sql,获取数据
    let data = await query(sql)
    // 3、数据传给前端解构渲染(规范)
    const responseData = {
        data,
        code: 0,
        msg: "success"
    }
    res.json(responseData)
}

// 编辑数据
CateController.UpdData = async (req, res) => {
    // 1、获取要编辑的数据
    // console.log(req.body);
    const { cate_id, cate_name, orderBy } = req.body;

    // 2、编写sql语句
    const sql = `update category set cate_name = '${cate_name}',orderBy = ${orderBy} 
    where cate_id = ${cate_id}`;
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

// 删除数据
CateController.Deldata = async (req, res) => {
    // 1、获取需要删除的数据
    const { cate_id, cate_name, orderBy } = req.body;
    // 2、编写sql语句
    const sql = `delete from category where cate_id = ${cate_id}`;
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

// 添加数据
CateController.addcategory = async (req, res) => {
    // 获取数据
    let { cate_name, orderBy } = req.body
    // 2、编辑sql,执行
    const sql = `insert into category(cate_name,orderBy) 
                values('${cate_name}',${orderBy})`;
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

module.exports = CateController
