const mysql = require('mysql')
const host = 'localhost'
const user = 'root'
const password = 'chen'
const database = 'vue3_mall'

const db = mysql.createPool({
  host,
  user,
  password,
  database
})

db.getConnection((err, data) => {
  if (err) throw err
  console.log('数据库链接成功')
})

module.exports = db
