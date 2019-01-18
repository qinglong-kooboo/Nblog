const User = require('../lib/mongo').User

module.exports = {
  // 创建用户
  create: function (user) {
    return User.insertOne(user).exec()
  },
  // 通过用户名查询用户是否存在
  getUserInfo (name) {
    return User.findOne({ name: name }).addCreatedAt().exec()
  }
}
