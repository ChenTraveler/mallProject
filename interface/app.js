const express = require('express')
const app = express()
const postRouter = require('./router/post')
const prot = 3000

// 使用路由
app.use('/', postRouter)

app.listen(prot, () => console.log('服务启动成功'))
