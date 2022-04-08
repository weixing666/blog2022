const { log } = require("console");
const express = require("express");
const path = require("path");
const app = express()
const dotenv = require('dotenv').config({ path: '.env' })
// 导入模块
const router = require("./router/router")
app.use(router)

// 托管静态资源
app.use("/assets", express.static(path.join(__dirname, "assets")))

app.listen(process.env.PORT, () => {
    console.log("server is running at port 3000");
})

