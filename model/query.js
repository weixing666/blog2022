var mysql = require('mysql');

//连接数据库参数配置
const dbConfig = require("../config/dbconfig")
var connection = mysql.createConnection(dbConfig);
//连接mysql
connection.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('connect mysql success');
});

//封装Promise函数形式
function query(sql) {
    return new Promise((resolve,reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

module.exports = query