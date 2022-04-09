const loginController = {};
const path = require("path")
const express = require('express')
const app = express();


// 导入模型
const query = require("../model/query");


loginController.login = (req, res) => {
    res.render("login.html")
}

loginController.userpass = async (req, res) => {
    let { username: name, password: pass } = req.body
    // 1、查询数据库，验证密码是否正确
    let sql = `select * from username where username = '${name}' and password = '${pass}'`
    let result = await query(sql)
    if (result === []) {
        // 说明密码不对，重定向登录页
        res.send(`<script>
                        alert("用户名或者密码不对")
                        location.href = "/login"
                </script>`)
    } {
        // 用户验证成功，需要设置session用户标记用户,并且登陆
        req.session.userid = result
        res.redirect("/index")
    }
}

// 退出登陆,未完成
loginController.logoff = (req, res) => {
    
}


module.exports = loginController