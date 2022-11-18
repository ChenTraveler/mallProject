// 引用数据库连接池
const db = require('../db/db')

// 解决跨域问题
const cors = require('cors')

// 引用multer插件
const multer = require('multer')

// 设置保存路径和文件名
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // 设置文件存储路径
    cb(null, './public/images')
  },
  filename(req, file, cb) {
    // 设置文件名
    // Math.round(Math.random() *1E9)是生成一个整数部分9位数的随机数，再取整
    let fileFormat = file.originalname.split('.')
    cb(
      null,
      `${file.fieldname}-${Date.now().toString().slice(4)}${Math.round(
        Math.random() * 1e4
      )}.${fileFormat[fileFormat.length - 1]}`
    )
  }
})

const upload = multer({
  storage: storage
})

// 加密插件
const bcrypt = require('bcryptjs')

// 定义加密密码的方法
const encrypt = (pwd, salt = 10) =>
  bcrypt.hashSync(pwd + '', bcrypt.genSaltSync(salt))

// token验证
const jwt = require('jsonwebtoken')

// 定义生成 token 的方法
const gettoken = (uname, time) => {
  const tokenStr = jwt.sign({ uname }, 'chenmy', { expiresIn: time })
  return 'Bearer ' + tokenStr
}

// 定义sql语句
const sql = {
  sel: ({ table, option = '*', other = '' }) => {
    return `select ${option} from ${table} ${other}`
  },
  sels: ({ tone, ttwo, foreign, option = '*', other = '' }) => {
    return `select ${option} from ${tone} join ${ttwo} on ${tone}.${foreign}=${ttwo}.${foreign} ${other}`
  },
  upd: ({ table, setStr, whereStr }) => {
    return `update ${table} set ${setStr} where ${whereStr}`
  },
  add: ({ table, field, data }) => {
    return `insert into ${table} (${field}) values (${data})`
  },
  del: ({ table, whereStr }) => {
    return `delete from ${table} where ${whereStr}`
  }
}

// 定义返回JSON
const json = {
  success(data, message = 'success') {
    return {
      status: 200,
      message,
      data
    }
  },
  fail(data, message = '网络连接失败，请稍后重试') {
    return { code: 1, message, data }
  }
}

// 正则验证
const reg = {
  phone:
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
  uname: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,16}$/,
  pwd: /^[A-Za-z\d.?]{6,16}$/,
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
}

// 修改条件
const others = {
  updnumber: number => `number="${number}"`,
  upduname: uname => `username="${uname}"`,
  updid: id => `id=${id}`
}

// 判断修改密码的密码是否符合要求
const regpwd = obj => {
  if (obj.includes('password')) {
    const arr = obj.split(',')
    let flag = true
    arr.forEach((i, index) => {
      arr[index] = i.split('=')
      if (arr[index][0] === 'password') {
        flag = reg.pwd.test(arr[index][1])
      }
    })
    return flag
  } else {
    return true
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

// 生成随机数
const getrandom = n => {
  let str = ''
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10)
  }
  return str
}

// console.log(gettoken('admin', '7d'))

// console.log(encrypt('123456'))

// console.log(Date.now())

module.exports = {
  db,
  sql,
  reg,
  json,
  others,
  upload,
  cors,
  encrypt,
  compare: bcrypt.compareSync,
  gettoken,
  regpwd,
  setStrispwd,
  getrandom
}
