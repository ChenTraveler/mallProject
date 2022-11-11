// 引用数据库连接池
const db = require('../db/db')

// 解决跨域问题
const cors = require('cors')

// 加密插件
const bcrypt = require('bcryptjs')

// 定义加密密码的方法
const encrypt = (pwd, salt = 10) =>
  bcrypt.hashSync(pwd, bcrypt.genSaltSync(salt))

// token验证
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

// 定义生成 token 的方法
const gettoken = (uname, time) => {
  const tokenStr = jwt.sign({ uname }, 'chenmy', { expiresIn: time })
  return 'Bearer ' + tokenStr
}

// 定义sql语句
const sql = {
  sel: (table, option = '*', other = '') => {
    return `select ${option} from ${table} ${other}`
  },
  sels: (tone, ttwo, foreign, option = '*', other = '') => {
    return `select ${option} from ${tone} join ${ttwo} on ${tone}.${foreign}=${ttwo}.${foreign} ${other}`
  },
  upd: (table, setStr, whereStr) => {
    return `update ${table} set ${setStr} where ${whereStr}`
  },
  add: (table, field, data) => {
    return `insert into ${table} (${field}) values (${data})`
  },
  del: (table, whereStr) => {
    return `delete from ${table} where ${whereStr}`
  }
}

// 判断是否修改密码
const setStrispwd = obj => {
  if (obj.includes('password')) {
    const arr = obj.split(',')
    arr.forEach((i, index) => {
      arr[index] = i.split('=')
      if (arr[index][0] === 'password') {
        arr[index][1] = `"${encrypt(arr[index][1])}"`
      }
      arr[index] = arr[index].join('=')
    })

    return arr.join(',')
  } else {
    return obj
  }
}

// const field = 'username,phone'
// const data = '名字,181'

// console.log(gettoken('admin', '18h'))

// console.log(data.split(',')[field.split(',').indexOf('username')])

// const obj = []
// console.log(JSON.stringify(obj))

module.exports = {
  db,
  cors,
  encrypt,
  compare: bcrypt.compareSync,
  gettoken,
  jwt_decode,
  sql,
  setStrispwd
}

// 添加请求拦截器
// axios.interceptors.request.use(
//   config => {
//     // 在发送请求之前做些什么
//     config.headers.Authorization = window.localStorage.getItem('token')
//     return config
//   },
//   // 对请求错误做些什么
//   error => Promise.reject(error)
// )

// 添加响应拦截器
// axios.interceptors.response.use(
//   response => {
//     // 对响应数据做点什么
//     if (
//       response.data.status === 1 &&
//       response.data.message === '身份认证失败'
//     ) {
//       location.href = '/login'
//     }
//     return response
//   },
//   // 对响应错误做点什么
//   error => Promise.reject(error)
// )
