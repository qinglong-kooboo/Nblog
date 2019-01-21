const marked = require('marked')
const Comment = require('../lib/mongo').Comment

Comment.plugin('contentToHtml', {
  afterFind: function (comments) {
    return comments.map((comment) => {
      comment.content = marked(comment.content)
      return comment
    })
  }
})

module.exports = {
  create: function (comment) {
    return Comment.create(comment).exec()
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
      .populate({ path: 'author', model: 'User'})
      .sort({ _id: 1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },
  getCommentsCount: function (postId) {
    return Comment.countDocuments({ postId: postId }).exec()
  }
}
