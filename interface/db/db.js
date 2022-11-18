const mysql = require('mysql')
const host = 'localhost' // 地址
const user = 'root' // 用户
const password = 'gc1206' // 密码
const database = 'vue3_mall' // 库

const db = mysql.createPool({
  host,
  user,
  password,
  database
})

// 创建连接池
db.getConnection((err, data) => {
  if (err) console.log('err', err.message)
})

module.exports = db
