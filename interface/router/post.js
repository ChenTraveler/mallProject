const express = require('express')
const postRouter = express()
const db = require('../db/db')

// 解决跨域问题
const cors = require('cors')
postRouter.use(cors())

// 使用body解析
postRouter.use(express.urlencoded({ extended: false }))

module.exports = postRouter
