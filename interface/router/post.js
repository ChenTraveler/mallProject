const express = require('express')
const postRouter = express()
// 引用工具包
const {
  db,
  sql,
  reg,
  json,
  others,
  upload,
  encrypt,
  compare,
  gettoken,
  regpwd,
  setStrispwd,
  getrandom
} = require('../tools')

// 单表查询数据
postRouter.post('/seldata', (req, res) => {
  console.log(sql.sel(req.body))

  db.query(sql.sel(req.body), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('查询失败', err.message))
    } else {
      res.json(json.success(d))
    }
  })
})

// 多表查询数据
postRouter.post('/selsdata', (req, res) => {
  db.query(sql.sels(req.body), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('查询失败', err.message))
    } else {
      res.json(json.success(d))
    }
  })
})

// 添加数据
postRouter.post('/adddata', (req, res) => {
  console.log(req.body)

  if (req.body.table === 'users' || req.body.table === 'userdata') {
    res.json(json.fail('添加失败', '添加用户数据请使用注册接口'))
  } else {
    db.query(sql.add(req.body), (err, d) => {
      if (err) {
        console.log('err', err.message)
        res.json(json.fail('添加失败', err.message))
      } else {
        d.affectedRows === 1
          ? res.json(json.success('添加成功'))
          : res.json(json.fail('添加失败'))
      }
    })
  }
})

// 修改商品
postRouter.post('/updgoods', (req, res) => {
  const config = req.body

  config.table = 'goods' // 表名
  config.whereStr = others.updnumber(config.number) // 修改条件语句

  db.query(sql.upd(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('修改失败', err.message))
    } else {
      d.affectedRows === 1
        ? res.json(json.success('修改成功'))
        : res.json(json.fail('修改失败'))
    }
  })
})

// 查询商品详情
postRouter.post('/details', (req, res) => {
  const config = req.body

  config.tone = 'goods' // 表1
  config.ttwo = 'details' // 表2
  config.foreign = 'number' // 关系字段

  db.query(sql.sels(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('查询失败', err.message))
    } else {
      res.json(json.success(d))
    }
  })
})

// 修改商品详情
postRouter.post('/upddetails', (req, res) => {
  const config = req.body

  config.table = 'details' // 表名
  config.whereStr = others.updnumber(config.number) // 修改条件语句

  db.query(sql.upd(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('修改失败', err.message))
    } else {
      d.affectedRows === 1
        ? res.json(json.success('修改成功'))
        : res.json(json.fail('修改失败'))
    }
  })
})

// 修改用户信息
postRouter.post('/upduser', (req, res) => {
  const config = req.body

  config.table = 'users' // 表名
  config.whereStr = others.upduname(config.uname) // 修改条件语句

  if (regpwd(config.setStr)) {
    config.setStr = setStrispwd(config.setStr) // 修改语句

    console.log(sql.upd(config))

    db.query(sql.upd(config), (err, d) => {
      if (err) {
        console.log('err', err.message)
        res.json(json.fail('修改失败', err.message))
      } else {
        console.log('修改成功')
        d.affectedRows === 1
          ? res.json(json.success('修改成功'))
          : res.json(json.fail('修改失败'))
      }
    })
  } else {
    res.json(json.fail('修改失败', '密码不符合规范'))
  }
})

// 查询用户数据
postRouter.post('/udata', (req, res) => {
  const config = req.body

  config.tone = 'users' // 表1
  config.ttwo = 'userdata' // 表2
  config.foreign = 'username' // 关系字段

  db.query(sql.sels(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('查询失败', err.message))
    } else {
      res.json(json.success(d))
    }
  })
})

// 修改用户数据
postRouter.post('/updudata', (req, res) => {
  const config = req.body

  config.table = 'userdata' // 表名
  config.whereStr = others.upduname(config.uname) // 修改条件语句

  db.query(sql.upd(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('修改失败', err.message))
    } else {
      d.affectedRows === 1
        ? res.json(json.success('修改成功'))
        : res.json(json.fail('修改失败'))
    }
  })
})

// 添加购物车
postRouter.post('/addcart', (req, res) => {
  const { uname, img, title, guige, num, price, number, state, orderid } =
    req.body

  const config = {
    table: 'cart', // 表名
    other: `where username="${uname}" and number=${number} and guige="${guige}" and submit='f'` // 查询条件语句
  }

  db.query(sql.sel(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('添加失败', err.message))
    } else {
      if (d[0]) {
        config.setStr = `num=${parseInt(d[0].num) + parseInt(num)}` // 修改语句
        config.whereStr = `id=${d[0].id}` // 修改条件语句

        db.query(sql.upd(config), (err, data) => {
          if (err) {
            console.log('err', err.message)
            res.json(json.fail('添加失败', err.message))
          } else {
            data.affectedRows === 1
              ? res.json(json.success('添加成功'))
              : res.json(json.fail('添加失败'))
          }
        })
      } else {
        config.field = 'username,title,guige,num,price,number,img' // 添加字段
        config.data = `"${uname}","${title}","${guige}",${num},${price},${number},"${img}"` // 对应数据

        console.log(state, orderid, price, img)
        if (state && orderid) {
          config.field += ',state,orderid,stime,submit' // 添加字段
          config.data += `,"${state}","${orderid}",now(),"t"` // 对应数据
        }
        console.log(sql.add(config))

        db.query(sql.add(config), (err, data) => {
          if (err) {
            console.log('err', err.message)
            res.json(json.fail('添加失败', err.message))
          } else {
            data.affectedRows === 1
              ? res.json(json.success('添加成功'))
              : res.json(json.fail('添加失败'))
          }
        })
      }
    }
  })
})

// 修改购物车订单
postRouter.post('/updcart', (req, res) => {
  const config = req.body

  config.table = 'cart' // 表名
  config.whereStr = others.updid(config.id) // 修改条件语句

  db.query(sql.upd(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('修改失败', err.message))
    } else {
      d.affectedRows === 1
        ? res.json(json.success('修改成功'))
        : res.json(json.fail('修改失败'))
    }
  })
})

// 删除购物车订单
postRouter.post('/delcart', (req, res) => {
  const config = req.body

  config.table = 'cart' // 表名
  config.whereStr = others.updid(config.id) // 修改条件语句

  db.query(sql.del(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('删除失败', err.message))
    } else {
      d.affectedRows === 1
        ? res.json(json.success('删除成功'))
        : res.json(json.fail('删除失败'))
    }
  })
})

// 修改首页图片
postRouter.post('/updhp', (req, res) => {
  const config = req.body

  config.table = 'homepage' // 表名
  config.whereStr = others.updid(config.id) // 修改条件语句

  db.query(sql.sel(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('修改失败', err.message))
    } else {
      d.affectedRows === 1
        ? res.json(json.success('修改成功'))
        : res.json(json.fail('修改失败'))
    }
  })
})

// 删除首页图片
postRouter.post('/delhp', (req, res) => {
  const config = req.body

  config.table = 'homepage' // 表名
  config.whereStr = others.updid(config.id) // 修改条件语句

  db.query(sql.del(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('删除失败', err.message))
    } else {
      d.affectedRows === 1
        ? res.json(json.success('删除成功'))
        : res.json(json.fail('删除失败', err.message))
    }
  })
})

// 修改分类
postRouter.post('/updtype', (req, res) => {
  const config = req.body

  config.table = 'type' // 表名
  config.setStr = `name="${config.name}",flag="${config.flag}"` // 修改语句
  config.whereStr = others.updid(config.id) // 修改条件语句

  db.query(sql.upd(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('修改失败', err.message))
    } else {
      if (config.id.includes('0')) {
        config.setStr = `flag="${config.flag}"` // 修改语句
        config.whereStr = `id like "${config.id
          .replace('0', '')
          .replace('0', '')}%"` // 修改条件语句

        db.query(sql.upd(config), (err, d) => {
          if (err) {
            console.log('err', err.message)
            res.json(json.fail('修改失败', err.message))
          } else {
            console.log(d.affectedRows)
            d.affectedRows >= 1
              ? res.json(json.success('修改成功'))
              : res.json(json.fail('修改失败'))
          }
        })
      } else {
        d.affectedRows === 1
          ? res.json(json.success('修改成功'))
          : res.json(json.fail('修改失败'))
      }
    }
  })
})

// 上传图片只能是POST请求
postRouter.post('/upload', upload.array('files', 5), (req, res) => {
  //upload.single()里边的file是指定上传formdata时的键名
  if (req.files.length > 0) {
    let [size, mimetype, filename] = [0, [], []]
    req.files.forEach(i => {
      size += i.size // 文件大小
      mimetype.push(i.mimetype.split('/')[1]) // 文件类型
      filename.push(i.filename) // 文件名称
    })
    let types = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'] //限制上传的文件类型

    let Typeflag = true
    for (let i = 0; i < mimetype.length; i++) {
      if (types.includes(mimetype[i])) {
        Typeflag = true
      } else {
        Typeflag = false
        break
      }
    }
    // 限制尺寸(不大于10m)
    if (size >= 10 * 1024 * 1024) {
      return res.json({ code: 1, msg: '文件过大' })
    } else if (!Typeflag) {
      return res.json({ code: 1, msg: '类型错误' })
    } else {
      res.json({ status: 200, msg: filename.join(';') })
    }
  } else {
    res.json({ code: 1, msg: '上传文件不能为空' })
  }
})

// 获取手机登录验证码
let [code, uphone] = ['', '']
postRouter.post('/getcode', (req, res) => {
  code = getrandom(6)
  uphone = req.body.phone
  res.json(json.success(code))
})

// 处理登录请求
postRouter.post('/login', (req, res) => {
  const { uname = '', phone, pwd = '', ucode } = req.body

  const config = {
    table: 'users', // 表名
    option: 'username,password', // 查询显示字段
    setStr: 'loginTime=now()', // 修改语句
    whereStr: `username='${uname}'` // 修改条件语句
  }

  const setTime = token => {
    db.query(sql.upd(config), err => {
      if (err) {
        console.log('err', err.message)
        res.json(json.fail('登录时间上传失败', err.message))
      } else {
        res.json(json.success(token, '登录成功'))
      }
    })
  }

  const response = (other, errmsg) => {
    config.other = other // 查询条件语句

    console.log(sql.sel(config))

    db.query(sql.sel(config), (err, d) => {
      if (err) {
        console.log('err', err.message)
        res.json(json.fail('登录失败', err.message))
      } else {
        if (d[0]) {
          const token = gettoken(d[0].username, `2h`)
          if (pwd) {
            if (compare(pwd + '', d[0].password)) {
              setTime(token)
            } else {
              res.json(json.fail('登录失败', errmsg[1]))
            }
          } else {
            setTime(token)
          }
        } else {
          res.json(json.fail('登录失败', errmsg[0]))
        }
      }
    })
  }

  const map = [
    [
      () => reg.email.test(uname) && reg.pwd.test(pwd),
      () =>
        response(
          `where username='${uname}' or email='${uname}' and exist='true'`,
          ['邮箱未注册或已注销', '邮箱或密码错误']
        )
    ],
    [
      () => reg.phone.test(uname) && reg.pwd.test(pwd),
      () =>
        response(
          `where username='${uname}' or phone='${uname}' and exist='true'`,
          ['手机号码未注册或已注销', '手机号码或密码错误']
        )
    ],
    [
      () => reg.uname.test(uname) && reg.pwd.test(pwd),
      () =>
        response(`where username='${uname}' and exist='true'`, [
          '用户名未注册或已注销',
          '用户名或密码错误'
        ])
    ],
    [
      () => reg.phone.test(phone),
      () => {
        if (code === ucode) {
          response(`where phone='${phone}' and exist='true'`, [
            '手机号码未注册或已注销',
            '用户名或密码错误'
          ])
        } else {
          res.json(json.fail('登录失败', '验证码错误'))
        }
      }
    ]
  ]

  const target = map.find(i => i[0]())

  if (target) {
    target[1]()
  } else {
    res.json(json.fail('登录失败'))
  }
})

// 处理注册请求
postRouter.post('/rej', (req, res) => {
  let uname = req.body.uname
  const { phone = '', pwd, ucode } = req.body

  const config = {
    table: 'users', // 表名
    option: 'username,phone,email', // 查询显示字段
    setStr: 'loginTime=now()', // 修改语句
    whereStr: `username='${uname}'` // 修改条件语句
  }

  const response = (
    other,
    errmsg,
    addarr = [
      'username,phone,password,rejTime',
      `'${uname}','${phone}','${encrypt(pwd)}',now()`
    ]
  ) => {
    config.other = other // 查询条件语句

    console.log(sql.sel(config))

    db.query(sql.sel(config), (err, d) => {
      if (err) {
        console.log('err', err.message)
        res.json(json.fail('注册失败', err.message))
      } else {
        if (d[0]) {
          res.json(json.fail(errmsg, '注册失败'))
        } else {
          config.field = addarr[0] // 添加字段
          config.data = addarr[1] // 对应数据

          db.query(sql.add(config), (err, data) => {
            if (err) {
              console.log('err', err.message)
              res.json(json.fail('注册失败', err.message))
            } else {
              config.table = 'userdata' // 表名
              config.field = 'username' // 添加字段
              config.data = `'${uname}'` // 对应数据

              db.query(sql.add(config), err => {
                if (err) {
                  console.log('err', err.message)
                  res.json(json.fail('用户数据创建失败', err.message))
                } else {
                  data.affectedRows === 1
                    ? res.json(json.success('注册成功'))
                    : res.json(json.fail('注册失败'))
                }
              })
            }
          })
        }
      }
    })
  }

  const map = [
    [
      () => reg.email.test(uname) && reg.pwd.test(pwd) && !ucode,
      () => {
        const email = uname
        uname = tb + uname.slice(0, 10)
        response(
          `where username='${uname}' or email='${email}'`,
          '用户名或邮箱不可用',
          [
            'username,email,password,rejTime',
            `'${uname}','${email}','${encrypt(pwd)}',now()`
          ]
        )
      }
    ],
    [
      () => reg.phone.test(uname) && reg.pwd.test(pwd) && !ucode,
      () => {
        const phone = uname
        uname = tb + phone
        response(
          `where username='${uname}' or phone='${phone}'`,
          '用户名或手机号不可用'
        )
      }
    ],
    [
      () => reg.uname.test(uname) && reg.pwd.test(pwd) && !ucode,
      () => response(`where username='${uname}'`, '用户名不可用')
    ],
    [
      () => reg.phone.test(phone) && reg.pwd.test(pwd),
      () => {
        uname = 'tb' + phone
        if (code === ucode) {
          response(`where phone='${phone}'`, '手机号不可用')
        } else {
          res.json(json.fail('验证码错误', '注册失败'))
        }
      }
    ]
  ]

  const target = map.find(i => i[0]())
  if (pwd) {
    if (reg.phone.test(phone)) {
      if (target) {
        target[1]()
      } else {
        res.json(json.fail('注册失败'))
      }
    } else {
      res.json(json.fail('请输入有效的手机号', '注册失败'))
    }
  }
})

// 修改密码验证
postRouter.post('/pwd', (req, res) => {
  const config = req.body

  config.table = 'users' // 表名
  config.option = 'password' // 查询显示字段
  config.other = `where username="${config.uname}"` // 查询条件语句

  db.query(sql.sel(config), (err, d) => {
    if (err) {
      console.log('err', err.message)
      res.json(json.fail('验证失败', err.message))
    } else {
      if (d[0]) {
        if (compare(config.pwd, d[0].password)) {
          res.json(json.success(true))
        } else {
          res.json(json.fail(false, '密码错误'))
        }
      } else {
        res.json(json.fail(false, '未匹配到用户'))
      }
    }
  })
})

module.exports = postRouter
