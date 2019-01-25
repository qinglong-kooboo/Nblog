const path = require('path')
const express = require('express')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const bodyParser = require('body-parser')
const pkg = require('./package')
const expressFormidable = require('express-formidable')
const resExtend = require('./utils/res-extend')

const app = express()

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// 处理表单以及文件上传的中间件
app.use(expressFormidable({
  uploadDir: path.join(__dirname, 'public/img'),
  keepExtensions: true
}))

// 使用中间件解析请求体
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// res extend
app.use(resExtend)

// 注册路由
routes(app)

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})

module.exports = app
