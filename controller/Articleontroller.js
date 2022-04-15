const Articleontroller = {};
const { log } = require("console");
const moment = require("moment");
let { rename, unlink } = require("../middleware/Asyrenaming")
const path = require("path")
// 导入模型
const query = require("../model/query")

Articleontroller.catelist = (req, res) => {
    res.render("articlelist.html")
}
Articleontroller.addArticle = (req, res) => {
    res.render("addArticle.html")
}
// 文章表渲染数据
Articleontroller.artiData = async (req, res) => {
    // 1.接收页码和每页显示条数
    let { page, limit, keyword } = req.query
    // 2.查询总的条数
    let sql1 = `select count(id) as count from article where 1`
    if (keyword) {
        sql1 += ` and title like '%${keyword}%' `
    }
    let data = await query(sql1)
    const count = data[0].count

    // 3.分页查询
    const offset = (page - 1) * limit
    let sql2 = `select t1.*,t2.cate_name,t3.username from article t1 
        left join category t2 on t1.cate_id = t2.cate_id 
        left join username t3 on t1.author = t3.id where 1`
    if (keyword) {
        sql2 += ` and t1.title like '%${keyword}%'`;
    }
    sql2 += ` order by t1.id desc limit ${offset},${limit}`

    let data2 = await query(sql2)

    data2 = data2.map(item => {
        let { status, cate_name, username, add_date } = item
        item.statusText = status == 1 ? '审核通过' : "审核中"
        item.cate_name = cate_name || '未分类'
        item.username = username || '匿名者'
        item.add_date = moment(add_date).format('YYYY-MM-DD HH:mm:ss')
        return item;
    })
    // 3.数据传给前端解构渲染(规范)
    res.json({
        count,//查询的总计数
        data: data2, //分页查询
        code: 0,
        msg: "success"
    })
}
// 添加文章数据
Articleontroller.addArtData = async (req, res) => {
    //接收参数
    const { title, cate_id, status, content } = req.body;
    const add_date = moment().format('YYYY-MM-DD HH:mm:ss')
    // 作者就是当前登陆的用户
    const author = req.session.userInfo.id;
    let pic = '';
    //上传文件,重命名,给pic地址
    if (req.file) {
        let { originalname, destination, filename } = req.file
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${originalname}`;
        await rename(oldPath, newPath)
        console.log(req.file);
        pic = `uploads/${originalname}`
    }

    //编写sql语句
    let sql = `insert into article(title,cate_id,status,content,add_date,author,pic) 
            values('${title}','${cate_id}','${status}','${content}','${add_date}','${author}','${pic}')`
    const { affectedRows } = await query(sql)
    //返回结果
    if (affectedRows > 0) {
        res.json({
            code: 0,
            message: '添加文章成功'
        })
    } else {
        res.json({
            code: -7,
            message: '添加文章失败'
        })
    }
}
// 文章列表编辑页面
Articleontroller.editArticle = (req, res) => {
    res.render("editArticle.html")
}
// 文章列表编辑数据
Articleontroller.editgetdata = async (req, res) => {
    let { id } = req.query
    let sql = `select * from article where id = ${id}`
    let result = await query(sql)
    res.json(result)
}
// 文章列表编辑数据完后上传数据
Articleontroller.addeditArtData = async (req, res) => {
    let { content, id, isUpdPic, oldPic, title, cate_id, status } = req.body
    // 判断是否上传图片
    if (isUpdPic === 1) {
        let { originalname, destination, filename } = req.file
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${originalname}`;
        await rename(oldPath, newPath)
        // 获取老pic
        oldpicpath = path.join(path.dirname(__dirname), oldPic)
        await unlink(oldpicpath)
        sql = `update article set title = '${title}',content = '${content}',status = '${status}'
        ,pic = '${newPath}',cate_id = '${cate_id}' where id = ${id}`
    } else {
        // 没有上传图片
        sql = `update article set title = '${title}',content = '${content}',status = '${status}'
        ,cate_id = '${cate_id}' where id = ${id}`
    }
    let { affectedRows } = await query(sql)
    if (affectedRows > 0) {
        res.json({
            code: 0,
            message: "更新成功"
        })
    } else {
        res.json({
            code: -8,
            message: "更新失败"
        })
    }
}
// 文章列表删除数据
Articleontroller.delArtData = async (req, res) => {
    // 1、获取需要删除的数据
    const { id } = req.body;
    // 2、编写sql语句
    const sql = `delete from article where id = ${id}`;
    // 3、执行sql语句并且给用户提示
    let { affectedRows } = await query(sql)
    // go(删除文章的封面图)
    const delData = {
        code: 0,
        message: "update success"
    }
    const failData = {
        code: -8,
        fail: "update fail"
    }
    if (affectedRows > 0) {
        res.json(delData)
    } else {
        res.json(failData)
    }
}
// 数据可视化的接口
Articleontroller.cateCount = async (req, res) => {
    const sql = `select count(t1.id)total,t2.cate_name from article t1 LEFT JOIN category t2 on t1.cate_id = t2.cate_id GROUP BY t1.cate_id`
    let result = await query(sql)
    result = result.map(item => {
        item.cate_name = item.cate_name || "未分类"
        return item
    })
    res.json(result)
}

module.exports = Articleontroller
