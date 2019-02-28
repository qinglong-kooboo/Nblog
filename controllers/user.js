'use strict'
const service = require('../service')
const { createToken } = require('../utils/auth')
class UserController {
  async login (req, res) {
    try {
      const result = await service.user.login(req.body)
      result.token = createToken(result._id)
      res.sendOk(result)
    } catch (error) {
      res.sendErr(error)
    }
  }
  async register (req, res) {
    try {
      const result = await service.user.register(req.body)
      res.sendOk(result)
    } catch (error) {
      res.sendErr(error)
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
