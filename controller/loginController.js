const loginController = {};
const path = require("path")
const express = require('express')
const app = express();
const md5 = require("md5")


// 导入模型
const query = require("../model/query");
// 导入加密配置
let { password_secret } = require('../config/config')

loginController.login = (req, res) => {
    res.render("login.html")
}

// 密码验证
loginController.userpass = async (req, res) => {
    let { username, password } = req.body
    let passwords = md5(`${password}${password_secret}`)
    // 1、查询数据库，验证密码是否正确
    let sql = `select * from username where username = '${username}' and password = '${passwords}'`
    let result = await query(sql)
    if (result.length > 0) {
        //2、将用户信息记录到session
        req.session.userInfo = result[0]
        //3、记录用户
        res.cookie('userInfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })
        res.json({
            code: 0,
            message: "login success"
        })
    } else {
        //3、失败则需要提示
        res.json({
            code: -1,
            message: "login fail"
        })
    }
}

// 退出登陆
loginController.logoff = (req, res) => {
    // 重定向页面,摧毁设置的session
    req.session.destroy(function (err) {
        if (err) {
            throw err;
        }
    })

    res.json({
        code: 0,
        message: "logout success"
    })
}

// 更新个人信息
loginController.UpduserInfo = async (req, res) => {
    let { id, intro } = req.body
    let sql = `update username set intro = '${intro}' where id = ${id}`
    let { affectedRows } = await query(sql)
    const delData = {
        code: "0",
        message: "upuser success"
    }
    const failData = {
        code: "1",
        fail: "upuser fail"
    }
    if (affectedRows > 0) {
        req.session.userInfo.intro = intro
        // 同步信息
        const sql = `select * from username where id = ${id}`
        let result = await query(sql)
        res.cookie('userInfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })

        res.json(delData)
    } else {
        res.json(failData)
    }

}


module.exports = loginController