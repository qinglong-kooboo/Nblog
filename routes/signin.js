const express = require('express')
const router = express.Router()
const sha1 = require('sha1')

const checkNotLogin = require('../middlewares/check').checkNotLogin
const UserModel = require('../models/users')

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signin')
})

// POST /sign 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
  const name = req.fields.name
  const password = req.fields.password

  // 校验参数
  try {
    if (!name.length) {
      throw new Error('请输入用户名')
    }
    if (!password.length) {
      throw new Error('请输入密码')
    }
  } catch (e) {
    res.flash('error', e.message)
    return res.redirect('back')
  }
  UserModel.getUserInfo(name)
    .then((user) => {
      if (!user) {
        req.flash('error', '用户不存在')
        return res.redirect('back')
      }
      if (sha1(password) !== user.password) {
        req.flash('error', '密码错误')
        return res.redirect('back')
      }
      req.flash('success', '登陆成功')
      // 用户信息写入 session
      delete user.password
      req.session.user = user
      res.redirect('/posts')
    })
    .catch(next)
})

module.exports = router
