const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
const PostModel = require('../models/post')
// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/posts', function (req, res, next) {
  res.render('posts')
})

router.get('/posts:author=', function (req, res, next) {
  res.render('posts')
})

// POST /posts/create 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
  let title = req.fields.title
  let content = req.fields.content
  const author = req.session.user._id

  // 校验参数
  try {
    if (!title.length) {
      throw new Error('来个标题吧！')
    }
    if (!content.length) {
      throw new Error('总得写点啥吧！')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }
  let Post = {
    author: author,
    title: title,
    content: content
  }
  PostModel.create(Post)
    .then((result) => {
      // let post = result.ops[0]
      req.flash('success', '发布成功')
      // res.redirect(`/post/${post._id}`)
      // res.redirect(`/posts`)
    })
    .catch((err) => {
      req.flash('error', err)
    })
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function (req, res, next) {
  res.render('create')
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function (req, res, next) {
  res.send('文章详情页')
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('更新文章页')
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('更新文章')
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  res.send('删除文章')
})

module.exports = router
