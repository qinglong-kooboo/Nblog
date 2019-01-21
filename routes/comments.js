const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const CommentModel = require('../models/comments')

// POST /comments 创建一条留言
router.post('/', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const content = req.fields.content
  const postId = req.fields.postId

  try {
    if (!content.length) {
      throw new Error('请输入留言内容！')
    }
  } catch (error) {
    req.flash('error', error.message)
    return res.redirect('back')
  }

  const comment = {
    author: author,
    content: content,
    postId: postId
  }
  CommentModel.create(comment)
    .then(() => {
      req.flash('success', '留言成功！')
      return res.redirect('back')
    })
    .catch(next)
})

// GET /comments/:commentId/remove 删除一条留言
router.get('/:commentId/remove', checkLogin, function (req, res, next) {
  const commentId = req.params.commentId
  const author = req.session.user._id

  CommentModel.getCommentById(commentId)
    .then((comment) => {
      if (!comment) {
        throw new Error('留言不存在！')
      }
      if (comment.author.toString() !== author.toString()) {
        throw new Error('没有权限删除留言！')
      }
      CommentModel.delCommentById(commentId)
        .then(() => {
          req.flash('success', '成功删除留言!')
          return res.redirect('back')
        })
        .catch(next)
    })
})

module.exports = router
