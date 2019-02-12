const service = require('../service')
const jwt = require('../utils/auth')

class UsersController {
  async login (res, req) {
    try {
      console.log(req.body)
      const result = await service.user.login(req.body)
      const token = jwt.createToken(result.id)
      result.token = token
      res.sendOk(result)
    } catch (error) {
      console.log(error)
    }
  }
  async register (res, req) {
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
  async detail (res, req) {
    try {
      service.user.detail(req.body)
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = new UsersController()
