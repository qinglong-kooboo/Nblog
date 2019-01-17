const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signup 注册页
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signup')
})

// POST /signup 用户注册
router.post('/', checkNotLogin, function (req, res, next) {
  const name = req.fields.name
  let password = req.fields.password
  const repassword = req.fields.repassword
  const gender = req.fields.gender
  const avatar = req.files.avatar.path.split(path.sep).pop()
  const bio = req.fields.bio

  try {
    if (!(name.length >= 1 && name.length <= 15)) {
      throw new Error('请输入名字且长度小于15！')
    }
    if (password.length < 6) {
      throw new Error('密码长度小于6个字符！')
    }
    if (repassword !== password) {
      throw new Error('两次输入的密码不一致！')
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('请选择性别！')
    }
    if (!req.files.avatar.name) {
      throw new Error('请上传头像！')
    }
    if (!(bio.length > 0 && bio.length < 30)) {
      throw new Error('请输入个人简介且长度小于30！')
    }
  } catch (error) {
    fs.unlink(req.files.avatar.path)
    req.flash('error', error.message)
    return res.redirect('/signup')
  }

  password = sha1(password)
  console.log(name)
  console.log(req.fields)
  let user = {
    name: name,
    password: password,
    gender: gender,
    avatar: avatar,
    bio: bio
  }
  console.log(UserModel)
  UserModel.create(user)
    .then(function (result) {
      user = result.ops[0]
      delete user.password
      req.session.user = user
      req.flash('success', '注册成功')
      res.redirect('/posts')
    })
    .catch(function (error) {
      fs.unlink(req.files.avatar.path)
      if (error.message.match('duplicate key')) {
        req.flash('error', '用户名已被占用')
        return res.redirect('/signup')
      }
      next(error)
    })
})

module.exports = router
