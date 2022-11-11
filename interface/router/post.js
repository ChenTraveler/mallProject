const express = require('express')
const postRouter = express()
// 引用工具包
const {
  db,
  cors,
  encrypt,
  compare,
  sql,
  gettoken,
  setStrispwd
} = require('../tools/tools')

// 解决跨域问题
postRouter.use(cors())

// 使用body解析
postRouter.use(express.urlencoded({ extended: false }))

// 单表查询数据
postRouter.post('/seldata', (req, res) => {
  const { table, option, other } = req.body

  db.query(sql.sel(table, option, other), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json({ code: 1, message: err.message, data: '查询失败' })
    } else {
      res.json({ status: 200, message: 'success', data: d })
    }
  })
})

// 多表查询数据
postRouter.post('/selsdata', (req, res) => {
  const { tabone, tabtwo, foreign, option, other } = req.body

  db.query(sql.sels(tabone, tabtwo, foreign, option, other), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json({
        code: 1,
        message: err.message,
        data: '查询失败'
      })
    } else {
      res.json({
        status: 200,
        message: 'success',
        data: d
      })
    }
  })
})

// 添加数据
postRouter.post('/adddata', (req, res) => {
  const { table, field, data } = req.body
  if (table === 'users' || table === 'userdata') {
    res.json({
      code: 1,
      message: '错误',
      data: '添加用户数据请使用注册接口'
    })
  } else {
    db.query(sql.add(table, field, data), (err, d) => {
      if (err) {
        console.log('err', err.message)
        res.json({
          code: 1,
          message: err.message,
          data: '网络连接失败，请稍后重试'
        })
      } else {
        d.affectedRows === 1
          ? res.json({
              status: 200,
              message: 'success',
              data: '添加成功'
            })
          : res.json({
              code: 1,
              message: 添加失败,
              data: '网络连接失败，请稍后重试'
            })
      }
    })
  }
})

// 修改条件
const others = {
  updnumber: number => `number="${number}"`,
  upduname: uname => `username="${uname}"`,
  updid: id => `id=${id}`
}

// 修改商品
postRouter.post('/updgoods', (req, res) => {
  const { setStr, number } = req.body

  db.query(sql.upd('goods', setStr, others.updnumber(number)), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json({
        code: 1,
        message: err.message,
        data: '网络连接失败，请稍后重试'
      })
    } else {
      d.affectedRows === 1
        ? res.json({
            status: 200,
            message: 'success',
            data: '修改成功'
          })
        : res.json({
            code: 1,
            message: '修改失败',
            data: '网络连接失败，请稍后重试'
          })
    }
  })
})

// 查询商品详情
postRouter.post('/details', (req, res) => {
  const { option, other } = req.body

  db.query(sql.sels('goods', 'details', 'number', option, other), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json({
        code: 1,
        message: err.message,
        data: '查询失败'
      })
    } else {
      res.json({
        status: 200,
        message: 'success',
        data: d
      })
    }
  })
})

// 修改商品详情
postRouter.post('/upddetails', (req, res) => {
  const { setStr, number } = req.body

  db.query(sql.upd('details', setStr, others.updnumber(number)), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json({
        code: 1,
        message: err.message,
        data: '网络连接失败，请稍后重试'
      })
    } else {
      d.affectedRows === 1
        ? res.json({
            status: 200,
            message: 'success',
            data: '修改成功'
          })
        : res.json({
            code: 1,
            message: '修改失败',
            data: '网络连接失败，请稍后重试'
          })
    }
  })
})

// 修改用户信息
postRouter.post('/upduser', (req, res) => {
  const { setStr, uname } = req.body

  db.query(
    sql.upd('users', setStrispwd(setStr), others.upduname(uname)),
    (err, d) => {
      if (err) {
        console.log('err', err.message)
        res.json({
          code: 1,
          message: err.message,
          data: '网络连接失败，请稍后重试'
        })
      } else {
        d.affectedRows === 1
          ? res.json({
              status: 200,
              message: 'success',
              data: '修改成功'
            })
          : res.json({
              code: 1,
              message: '修改失败',
              data: '网络连接失败，请稍后重试'
            })
      }
    }
  )
})

// 查询用户数据
postRouter.post('/udata', (req, res) => {
  const { option, other } = req.body

  db.query(
    sql.sels('users', 'userdata', 'username', option, other),
    (err, d) => {
      if (err) {
        console.log('err', err.message)
        res.json({
          code: 1,
          message: err.message,
          data: '查询失败'
        })
      } else {
        res.json({
          status: 200,
          message: 'success',
          data: d
        })
      }
    }
  )
})

// 修改用户数据
postRouter.post('/updudata', (req, res) => {
  const { setStr, uname } = req.body

  db.query(sql.upd('userdata', setStr, others.upduname(uname)), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json({
        code: 1,
        message: err.message,
        data: '修改失败'
      })
    } else {
      d.affectedRows === 1
        ? res.json({
            status: 200,
            message: 'success',
            data: '修改成功'
          })
        : res.json({
            code: 1,
            message: '修改失败',
            data: '网络连接失败，请稍后重试'
          })
    }
  })
})

// 修改购物车订单
postRouter.post('/updcart', (req, res) => {
  const { setStr, id } = req.body

  db.query(sql.upd('cart', setStr, others.updid(id)), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json({
        code: 1,
        message: err.message,
        data: '修改失败'
      })
    } else {
      d.affectedRows === 1
        ? res.json({
            status: 200,
            message: 'success',
            data: '网络连接失败，请稍后重试'
          })
        : res.json({
            code: 1,
            message: '修改失败',
            data: '网络连接失败，请稍后重试'
          })
    }
  })
})

// 删除购物车订单
postRouter.post('/delcart', (req, res) => {
  const { id } = req.body

  db.query(sql.del('cart', others.id(id)), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json({
        code: 1,
        message: err.message,
        data: '网络连接失败，请稍后重试'
      })
    } else {
      d.affectedRows === 1
        ? res.json({
            status: 200,
            message: 'success',
            data: '删除成功'
          })
        : res.json({
            code: 1,
            message: '删除失败',
            data: '网络连接失败，请稍后重试'
          })
    }
  })
})

// 修改首页图片
postRouter.post('/updhp', (req, res) => {
  const { setStr, id } = req.body

  db.query(sql.sel('homepage', setStr, others.updid(id)), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json({
        code: 1,
        message: err.message,
        data: '网络连接失败，请稍后重试'
      })
    } else {
      d.affectedRows === 1
        ? res.json({
            status: 200,
            message: 'success',
            data: '修改成功'
          })
        : res.json({
            code: 1,
            message: '修改失败',
            data: '网络连接失败，请稍后重试'
          })
    }
  })
})

// 删除首页图片
postRouter.post('/delhp', (req, res) => {
  const { id } = req.body

  db.query(sql.del('homepage', others.id(id)), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json({
        code: 1,
        message: err.message,
        data: '网络连接失败，请稍后重试'
      })
    } else {
      d.affectedRows === 1
        ? res.json({
            status: 200,
            message: 'success',
            data: '删除成功'
          })
        : res.json({
            code: 1,
            message: '删除失败',
            data: '网络连接失败，请稍后重试'
          })
    }
  })
})

// 处理登录请求
postRouter.post('/login', (req, res) => {
  const { uname, phone, pwd } = req.body

  db.query(
    sql.sel(
      'users',
      'username,password',
      `where username='${uname}' or phone='${phone}' or phone='${uname}' or email='${uname}' and exist='t'`
    ),
    (err, d) => {
      if (err) {
        console.log('err', err.message, 1)
        res.json({
          code: 1,
          message: err.message,
          data: '网络连接失败，请稍后重试'
        })
      } else if (d[0]) {
        const token = gettoken(d[0].username, `2h`)
        if (pwd) {
          if (compare(pwd, d[0].password)) {
            db.query(
              sql.upd(
                'users',
                'loginTime=now()',
                `username='${d[0].username}'`
              ),
              err => {
                if (err) {
                  console.log('err', err.message, 2)
                  res.json({
                    code: 1,
                    message: err.message,
                    data: '登录时间上传失败'
                  })
                } else {
                  res.json({ status: 200, message: '登录成功', data: token })
                }
              }
            )
          } else {
          }
        } else if (phone === d[0].phone) {
          db.query(
            sql.upd('users', 'loginTime=now()', `username='${d[0].username}'`),
            err => {
              if (err) {
                console.log('err', err.message, 3)
                res.json({
                  code: 1,
                  message: err.message,
                  data: '登录时间上传失败'
                })
              } else {
                res.json({ status: 200, message: '登录成功', data: token })
              }
            }
          )
        } else {
          res.json({
            code: 1,
            message: '用户名或密码错误',
            data: '用户名或密码错误'
          })
        }
      } else {
        res.json({
          code: 1,
          message: '用户名或手机号、邮箱未注册',
          data: '用户名或手机号、邮箱未注册'
        })
      }
    }
  )
})

// 处理注册请求
postRouter.post('/rej', (req, res) => {
  const { uname, phone, pwd } = req.body

  db.query(
    sql.sel(
      'users',
      'username,phone,email',
      `where username='${uname}' or phone='${phone}' or email='${uname}'`
    ),
    (err, d) => {
      if (err) {
        console.log('err', err.message)
        res.json({
          code: 1,
          message: err.message,
          data: '网络连接失败，请稍后重试'
        })
      } else {
        if (d[0]) {
          if (d[0].username === uname) {
            res.json({
              code: 1,
              message: 'fail',
              data: '用户名不可用'
            })
          } else if (d[0].phone === phone) {
            res.json({
              code: 1,
              message: 'fail',
              data: '电话已绑定账号'
            })
          } else if (d[0].email === uname) {
            res.json({
              code: 1,
              message: 'fail',
              data: '邮箱已绑定账号'
            })
          } else {
            res.json({
              code: 1,
              message: 'fail',
              data: '网络连接失败，请稍后重试'
            })
          }
        } else {
          uname === undefined ? (uname = `Tb${phone}`) : null
          db.query(
            sql.add(
              'users',
              'username,phone,password,rejTime',
              `'${uname}','${phone}','${encrypt(pwd)}',now()`
            ),
            (err, data) => {
              if (err) {
                console.log('err', err.message)
                res.json({
                  code: 1,
                  message: err.message,
                  data: '网络连接失败，请稍后重试'
                })
              } else {
                db.query(sql.add('userdata', 'username', `${uname}`), err => {
                  if (err) {
                    console.log('err', err.message)
                    res.json({
                      code: 1,
                      message: err.message,
                      data: '用户数据创建失败'
                    })
                  } else {
                    data.affectedRows === 1
                      ? res.json({
                          status: 200,
                          message: 'success',
                          data: '注册成功'
                        })
                      : res.json({
                          code: 1,
                          message: 'fail',
                          data: '网络连接失败，请稍后重试'
                        })
                  }
                })
              }
            }
          )
        }
      }
    }
  )
})

module.exports = postRouter
