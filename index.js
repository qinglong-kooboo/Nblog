'use strict'
const path = require('path')
const express = require('express')
const config = require('config-lite')(__dirname)
const routes = require('./core/routes')
const bodyParser = require('body-parser')
const pkg = require('./package')
const resExtend = require('./utils/res-extend')
const mongodb = require('./core/mongodb')
const redis = require('./core/redis')
const app = express()

// 打印日志
const log = require('./middlewares/log')
app.all('*', log)

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// 连接数据库
redis.connect()
mongodb.connect()

// res extend
app.use(resExtend)

// 使用中间件解析请求体
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 注册路由
routes(app)

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})

module.exports = app
