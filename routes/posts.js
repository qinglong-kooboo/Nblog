const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
const PostModel = require('../models/posts')
// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  const author = req.query.author
  PostModel.getPosts(author)
    .then(function (posts) {
      res.render('posts', {
        posts: posts
      })
    })
    .catch(next)
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
  let post = {
    author: author,
    title: title,
    content: content
  }
  PostModel.create(post)
    .then((result) => {
      post = result.ops[0]
      req.flash('success', '发布成功')
      res.redirect(`/posts/${post._id}`)
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
  const postId = req.params.postId
  Promise.all([
    PostModel.getPostById(postId),
    PostModel.incPv(postId)
  ]).then((result) => {
    const post = result[0]
    if (!post) {
      throw new Error('文章不存在！')
    }
    res.render('post', {
      post: post
    })
  })
    .catch((err) => {
      res.flash('error', err)
    })
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user.id
  PostModel.getRowPostById(postId)
    .then((post) => {
      if (!post) {
        throw new Error('不存在该文章!')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('抱歉！你没有权限！')
      }
      res.render('edit', {
        post: post
      })
    })
    .catch((err) => {
      res.flash('error', err)
    })
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content
  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题')
    }
    if (!content.length) {
      throw new Error('请填写内容')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }
  PostModel.getRowPostById(postId)
    .then((post) => {
      if (!post) {
        throw new Error('文章不存在！')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('您没有权限！')
      }
      let updatePost = {
        title: title,
        content: content
      }
      PostModel.updatePostById(updatePost)
        .then(() => {
          req.flash('success', '编辑文章成功')
          res.redirect(`/post/${postId}`)
        })
        .catch((err) => {
          res.flash('error', err)
        })
    })
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id
  PostModel.getRowPostById(postId)
    .then((post) => {
      if (!post) {
        throw new Error('不存在该文章!')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('抱歉！你没有权限！')
      }
      PostModel.deleteById(postId)
        .then(() => {
          req.flash('success', '删除成功')
          return res.redirect('back')
        })
        .catch((err) => {
          req.flash('error', err)
        })
    })
})

module.exports = router
