const express = require("express");
const app = express();
const router = express.Router();
const multer = require('multer')
// 设置上传的目录
const upload = multer({
    dest: 'uploads/'
})
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
// 添加文章页面
router.get("/addArticle", Articleontroller.addArticle)
// 文章表编辑数据
router.get("/editArticle", Articleontroller.editArticle)
// 文章表渲染数据
router.get("/artiData", Articleontroller.artiData)
// 文章列表添加数据
router.post("/addArtData", upload.single('pic'), Articleontroller.addArtData)
//文章列表编辑数据
router.get("/editgetdata", Articleontroller.editgetdata)
// 文章列表编辑完后后上传数据
router.post("/addeditArtData", upload.single('pic'), Articleontroller.addeditArtData)
//文章列表删除数据
router.post("/delArtData", Articleontroller.delArtData)
// 首页数据可视化
router.get("/cateCount", Articleontroller.cateCount)
// 登陆验证
router.get("/login", loginController.login)
router.post("/userpass", loginController.userpass)
router.get("/logoff", loginController.logoff)
router.post("/UpduserInfo", loginController.UpduserInfo)
router.post("/valipass", loginController.valipass)
router.post("/editpass", loginController.editpass)
router.post("/avatar", upload.single('file'), loginController.avatar)



module.exports = router