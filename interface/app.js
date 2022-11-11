const express = require('express')
const app = express()
const prot = 3000
// const getRouter = require('./router/get')
const postRouter = require('./router/post')
// token验证中间件
const { expressjwt: jwt } = require('express-jwt')

// 使用中间件jwt
app.use(
  jwt({
    secret: 'chenmy', // 生成 token 时的钥匙，必须和生成 token 时设置的统一
    algorithms: ['HS256'] // 必填，加密算法，无需了解
  }).unless({
    path: [{ url: /^\/*/, methods: ['GET'] }, '/api/login', '/api/rej'] // 除了这些接口，其他都需要认证
  })
)

// 使用路由
// app.use('/api', getRouter)
app.use('/api', postRouter)

// 验证错误处理
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // res.status(401).send('invalid token...');
    res.status(401).send({ status: 1, message: '身份认证失败' })
  } else {
    res.send({ message: '获取用户信息成功！', data: req.auth.uname })
  }
  next()
})

app.listen(prot, () => console.log('服务启动成功'))
