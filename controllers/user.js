'use strict'
const service = require('../service')
const jwt = require('../utils/auth')

class UserController {
  async login (req, res) {
    try {
      const result = await service.user.login(req.body)
      const token = jwt.createToken(result.id)
      result.token = token
      res.sendOk(result)
    } catch (error) {
      res.sendErr(error.errMessage)
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
      res.sendErr(errMessage)
    }
  }
  async getUserByName (req, res) {
    try {
      const result = await service.user.getUserByName(req.query.name)
      res.sendOk(result)
    } catch (error) {
      res.sendErr(error)
    }
  }
}

module.exports = new UserController()
