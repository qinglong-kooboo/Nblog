const userService = require ('../service/users')
const jwt = require('../utils/auth')

class UsersController {
  async login (res, req) {
    try {
      const result = await userService.login(req.body)
      const token = jwt.createToken(result.id)
      result.token = token
      res.sendOk(result)
    } catch (error) {
      res.sendError(error)
    }
  }
  async register (res, req) {
    try {
      userService.register(req.body)
    } catch (error) {
      throw new Error(error)
    }
  }
  async detail (res, req) {
    try {
      userService.detail(req.body)
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = new UsersController()
