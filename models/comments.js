const marked = require('marked')

Comment.plugin('contentToHtml', {
  afterFind: function (comments) {
    return comments.map((comment) => {
      comment.content = marked(comment.content)
      return comment
    })
  }
})
const comment =
exports.Comment = mongolass.model('Comment', {
  author: {
    type: Mongolass.Types.ObjectId,
    required: true
  },
  content: {
    type: 'string',
    required: true
  },
  postId: {
    type: Mongolass.Types.ObjectId,
    required: true
  }
})
exports.Comment.createIndex({ postId: 1, _id: 1 }).exec()

module.exports = {
  create: function (comment) {
    return Comment.insertOne(comment).exec()
  },
  getCommentById: function (commentId) {
    return Comment.findOne({ _id: commentId }).exec()
  },
  delCommentById: function (commentId) {
    return Comment.deleteOne({ _id: commentId }).exec()
  },
  delCommentByPostId: function (postId) {
    return Comment.deleteMany({ postId: postId }).exec()
  },
  getComments: function (postId) {
    return Comment
      .find({ postId: postId })
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: 1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },
  getCommentsCount: function (postId) {
    return Comment.countDocuments({ postId: postId }).exec()
  }
}
