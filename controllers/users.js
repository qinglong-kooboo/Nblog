'use strict'
const service = require('../service')
const jwt = require('../utils/auth')

class UsersController {
  async login (req, res) {
    try {
      console.log(11111)
      const result = await service.user.login(req.body)
      const token = jwt.createToken(result.id)
      result.token = token
      res.sendOk(result)
    } catch (error) {
      console.log(error)
    }
  }
  async register (req, res) {
    try {
      const result = await service.user.register(req.body)
      const token = jwt.createToken(result.id)
      result.token = token
      res.sendOk(result)
    } catch (error) {
      const errMessage = 'REGISTER_FAILED'
      throw errMessage
    }
  }
  async detail (req, res) {
    try {
      service.user.detail(req.body)
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = new UsersController()
