const express = require('express')
const app = express()
const prot = 3000
const postRouter = require('./router/post')
const { cors } = require('./tools')
// const favicon = require('serve-favicon')

app.use(cors())

// 使用body解析
app.use(express.urlencoded({ limit: '1mb', extended: false }))
app.use(express.json({ limit: '1mb' }))

// 静态资源
app.use(express.static('./public/images'))

// token验证中间件
const { expressjwt: jwt } = require('express-jwt')

// 使用中间件jwt
app.use(
  jwt({
    secret: 'chenmy', // 生成 token 时的钥匙，必须和生成 token 时设置的统一
    algorithms: ['HS256'] // 必填，加密算法，无需了解
  }).unless({
    path: [
      { url: /^\/*/, methods: ['GET'] },
      '/api/login',
      '/api/rej',
      '/api/upload'
    ] // 除了这些接口，其他都需要认证
  })
)

// 使用路由
app.use('/api', postRouter)

// 验证错误处理
app.use((err, req, res, next) => {
  console.log(err)
  if (err.name === 'UnauthorizedError') {
    // res.status(401).send('invalid token...');
    res.status(401).send({ status: 1, message: '身份认证失败' })
  } else {
    res.send({ err: err, msg: '网络连接失败！', data: req.auth })
  }
})

app.listen(prot, () => console.log('服务启动成功'))
