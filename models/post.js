const Post = require('../lib/mongo').Post

module.exports = {
  create: function (post) {
    return Post.insertOne(post).exec()
  }
}
