const express = require("express");
const { log } = require("util");
const app = express();
const reception = express.Router();

// 导入前台控制器
const receptionController = require("../controller/receptionController")

reception.get("/cate", receptionController.cate)
reception.get("/article", receptionController.article)
reception.get("/catedataall", receptionController.catedataall)
reception.get("/cateAll", receptionController.cateAll)

module.exports = reception
console.log();