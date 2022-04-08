const express = require("express");
const path = require("path");
const artTemplate = require('art-template');
const express_template = require('express-art-template');

// 导入模块
const router = require("./router/router")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const dotenv = require('dotenv').config({ path: '.env' })


//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件(不设这句话，模板文件的后缀默认是.art)
app.engine('html', express_template);
//设置视图引擎为上面的html
app.set('view engine', 'html');

// 托管静态资源
app.use("/assets", express.static(path.join(__dirname, "assets")))

app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`);
})

