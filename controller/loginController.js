const loginController = {};
const path = require("path")
const express = require('express')
const app = express();
const md5 = require("md5")
const { rename, unlink } = require("../middleware/Asyrenaming") //异步文件

// 导入模型
const query = require("../model/query");
// 导入加密配置
let { password_secret } = require('../config/config');
const { log } = require("console");

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
        //2、将用户信息记录到session,初始化的时候已经设置有效期
        let result2 = await query(sql)
        req.session.userInfo = result[0]
        //3、记录用户,记得设置有效期
        res.cookie('userInfo', JSON.stringify(result2[0]), {
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
// 修改密码验证密码接口
loginController.valipass = async (req, res) => {
    let { pass, user } = req.body
    let passwords = md5(`${pass}${password_secret}`)
    // 1、查询数据库，验证密码是否正确
    let sql = `select password from username where username = '${user}'`
    let result = await query(sql)
    let { password } = result[0]
    if (password === passwords) {
        res.json({
            code: 0,
            message: "pass yes"
        })
    } else {
        res.json({
            code: -1,
            message: "pass no"
        })
    }
}
// 确认修改密码
loginController.editpass = async (req, res) => {
    let { newpassword2, id } = req.body
    console.log(req.session.userInfo);
    let addpass = md5(`${newpassword2}${password_secret}`)
    let sql = `update username set password = '${addpass}' where id = ${id}`
    let { affectedRows } = await query(sql)
    if (affectedRows > 0) {
        //更新成功之后,摧毁session,重新登陆
        req.session.destroy(function (err) {
            if (err) {
                throw err;
            }
        })

        res.json({
            code: 0,
            message: "更改成功,请重新登陆"
        })
    } else {
        res.json({
            code: -5,
            message: "更改失败"
        })
    }
}
// 退出登陆
loginController.logoff = (req, res) => {
    //    摧毁设置的session
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

// 上传头像的接口
loginController.avatar = async (req, res) => {
    // 获取用户在session中的id信息,用于查数据
    let { id } = req.session.userInfo
    // 获取到上文的文件信息重命名
    if (req.file) {
        let { originalname, destination, filename } = req.file
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${originalname}`;
        await rename(oldPath, newPath)
        // 获取pic
        let oldheadpic = req.session.userInfo.avatar;
        oldheadpic = path.join(path.dirname(__dirname), oldheadpic)
        await unlink(oldheadpic)
        // 将新的图片信息插入数据库
        const sql = `update username set avatar = '${newPath}'where id = ${id}`
        await query(sql)
        // 取出用户信息，再同步session和cookie中的用户信息
        const sql2 = `select * from username where id = ${id}`
        let result = await query(sql2)
        req.session.userInfo = result[0]
        res.cookie('userInfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })
        res.json({
            code: 0,
            message: "upload success"
        })
    } else {
        res.json({
            code: -6,
            message: "upload fail",

        })
    }


}
module.exports = loginController