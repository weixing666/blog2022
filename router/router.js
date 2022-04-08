const express = require("express");
const app = express();
const router = express.Router();
const IndexController = require("../controller/IndexController")

router.get("/index", IndexController.index)
router.get("/login", IndexController.login)

module.exports = router