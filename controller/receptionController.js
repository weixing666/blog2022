
// 导入模型
const { log } = require("util");
const query = require("../model/query")

const receptionController = {};

receptionController.cate = async (req, res) => {
    const sql = 'select * from category'
    let result = await query(sql)
    res.json(result)
}

receptionController.article = async (req, res) => {
    let { page=1, limit=5} = req.query
    // page 页码(第几页)
    // limit 条数
    // offset 起始位置
    let offset = (page - 1) * limit
    const sql = `SELECT
	t1.*, t2.cate_name,
	t3.username
FROM
	article t1
LEFT JOIN category t2 ON t1.cate_id = t2.cate_id
LEFT JOIN username t3 ON t1.cate_id = t3.id
where status = 1
order By t1.id desc
LIMIT ${offset},${limit}`

    let result = await query(sql)
    res.json(result)
}

receptionController.catedataall = async (req, res) => {
    let { id } = req.query
    let sql = `select t1.*,t2.cate_name from article t1 left join category t2 on t1.cate_id = t2.cate_id
    where t1.id = ${id}`
    let result = await query(sql)
    res.json(result)
}

receptionController.cateAll = async (req, res) => {
    let { cate_id} = req.query
    let sql = `select t1.*,t2.cate_name,t3.username from article t1 
    left join category t2 on t1.cate_id = t2.cate_id
    left join username t3 on t1.author = t3.id
    where t1.cate_id = ${cate_id}`
    let result = await query(sql)
    res.json(result)
}
// 导出前台控制器
module.exports = receptionController