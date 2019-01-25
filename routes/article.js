const Mongolass = require('mongolass')
const mongolass = new Mongolass()

exports.article = mongolass.model('article', {
  author: {
    type: Mongolass.Types.ObjectId,
    required: true
  },
  title: {
    type: 'string',
    required: true
  },
  content: {
    type: 'string',
    required: true
  },
  pv: {
    type: 'number',
    default: 0
  }
})
exports.createIndex({ author: 1, _id: -1 }).exec() // 按创建时间降序查看用户的文章列表
