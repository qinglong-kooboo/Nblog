const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin
const UserModel = require('../lib/mongo').User
const getUserInfo = require('../models/users').getUserInfo

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
  getUserInfo(name)
    .then((user) => {
      if (!user) {
        req.flash('error', '用户不存在')
        return res.redirect('back')
      }
      if (user.password !== password) {
        req.flash('error', '密码错误')
        return res.redirect('back')
      }
      req.flash('success', '登陆成功')
      res.redirect('/posts')
    })
    .catch(next)
})

module.exports = router
