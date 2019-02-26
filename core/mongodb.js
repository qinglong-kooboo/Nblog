const mongoose = require('mongoose')
const CONFIG = require('../config/default')
const mongoosePaginate = require('mongoose-paginate')
const autoIncrement = require('mongoose-auto-increment')
mongoose.promise = global.promise

// remove DeprecationWarning
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// plugin options
mongoosePaginate.paginate.options = {
  limit: CONFIG.LIMIT
}

// 链接数据库
exports.connect = () => {
  mongoose.connect(CONFIG.mongodb, {
    useCreateIndex: true,
    useNewUrlParser: true,
    promiseLibrary: global.Promise
  })
  // 连接错误
  mongoose.connection.on('error', error => {
    console.log('数据库连接失败!', error)
  })

  // 连接成功
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功!')
  })

  // 自增 ID 初始化
  autoIncrement.initialize(mongoose.connection)

  // 返回实例
  return mongoose
}
