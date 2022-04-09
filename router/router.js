const express = require("express");
const app = express();
const router = express.Router();
const IndexController = require("../controller/IndexController")
const CateController = require("../controller/CateController")
const Articleontroller = require("../controller/Articleontroller")
const loginController = require("../controller/loginController")

// 首页&登录页
router.get("/index", IndexController.index)

// 系统设置-获取
router.get("/systemData", IndexController.systemData)

// 系统设置-编辑
router.post("/editsettings", IndexController.editsettings)


// 分类列表
router.get("/catelist", CateController.catelist)
// 分类列表渲染数据
router.get("/cateData", CateController.cateData)
// 分类列表编辑数据
router.post("/UpdData", CateController.UpdData)
// 分类列表删除数据
router.post("/Deldata", CateController.Deldata)
// 分类列表添加数据
router.post("/addcategory", CateController.addcategory)

// 文章列表
router.get("/articlelist", Articleontroller.catelist)

// 登陆验证
router.get("/login", loginController.login)
router.post("/userpass", loginController.userpass)
// router.post("/logoff", loginController.logoff)




module.exports = router