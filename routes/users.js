const express = require('express')
const router = express.Router()
const controllers = require('../controllers')
const verifyToken = require('../middlewares/check').verifyToken

router.post('/user/login', controllers.usersController.login)
router.post('/user/register', controllers.usersController.register)
router.get('/user/detail', verifyToken, controllers.usersController.detail)
