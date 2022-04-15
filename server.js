const express = require("express");
const path = require("path");
const dotenv = require('dotenv').config({ path: '.env' })
const artTemplate = require('art-template');
const express_template = require('express-art-template');
const multer = require('multer')
const checkSessAuth = require("./middleware/checkSessAuth")


// 需放在所有需要使用的app变量的前面
const app = express()

const session = require('express-session');

// 托管静态资源(需放在拦截路由的前面)
app.use("/assets", express.static(path.join(__dirname, "assets")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// 初始化session相关配置
app.use(
    session({
        name: 'sesskey',        // session会话名称存储在cookie中的键名
        secret: "dad&af5%$",      //用户session会话加密
        cookie: {              //设置session在cookie中的其他选项配置
            path: "/",
            httpOnly: true,
            maxAge: 60000 * 24,   // 有效期，有效期内访问重置，否则失效
        }
    })
)

// 放行路由(需在所有路由的前面)
app.use(checkSessAuth)

// 导入路由模块
const router = require("./router/router");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件(不设这句话，模板文件的后缀默认是.art)
app.engine('html', express_template);
//设置视图引擎为上面的html
app.set('view engine', 'html');

app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`);
})

