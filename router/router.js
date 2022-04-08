const express = require("express");
const app = express();
const router = express.Router();
const IndexController = require("../controller/IndexController")
const CateController = require("../controller/CateController")
const Articleontroller = require("../controller/Articleontroller")

// 首页&登录页
router.get("/index", IndexController.index)
router.get("/login", IndexController.login)

// 分类列表
router.get("/catelist", CateController.catelist)
// 分类列表渲染数据
router.get("/cateData", CateController.cateData)
// 分类列表编辑数据
router.post("/UpdData", CateController.UpdData)
// 分类列表删除数据
router.post("/Deldata", CateController.Deldata)

// 文章列表
router.get("/articlelist", Articleontroller.catelist)

module.exports = router