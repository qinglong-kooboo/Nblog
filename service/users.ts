const cypto = require('../utils/crypto')
const format = require('../utils/format')
const BaseService = require('./base')
const Users = require('../models/users')

class UserService extends BaseService {
  constructor(model) {
    super(model)
    this.model = 'User'
  }
  async login(data) {
    try {
      const findRes = await Users.findOne({ name: data.name }).exec()
      if (!findRes) {
        throw new Error('USER_NOT_EXITS')
      }
      const inputPassword = cypto.encrypt(data.inputPassword)
      const password = findRes.password
      const equal = cypto.checkPasswd(inputPassword, password)
      if (!equal) {
        throw new Error('USER_PASSWORD_WRONG')
      }
      const result = format.formatUser(findRes)
      return result
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default UserService
