'use strict'
const cypto = require('../utils/crypto')
const format = require('../utils/format')
const BaseService = require('./base')
const Users = require('../models/users')

class UserService extends BaseService {
  constructor (model) {
    super(model)
    this.model = 'User'
  }
  async login (data) {
    try {
      const findRes = await Users.findOne({ name: data.name }).exec()
      if (!findRes) {
        const errorMsg = 'USERNAME_IS_WRONG'
        throw errorMsg
      }
      const inputPassword = cypto.encrypt(data.inputPassword)
      const password = findRes.password
      const equal = cypto.checkPasswd(inputPassword, password)
      if (!equal) {
        const errorMsg = 'PASSWORD_IS_WRONG'
        throw errorMsg
      }
      const result = format.formatUser(findRes)
      return result
    } catch (error) {
      const errorMsg = 'USER_LOGIN_FAILED'
      throw errorMsg
    }
  }
  // async register (data) {
  //   const findRes = await Users.findOne({ name: data.name }).exec()
  //   if (findRes) {
  //     throw new Error('USER_EXISTED')
  //   }
  //   const password = cypto.encrypt(data.inputPassword)
  //   data.password =
  // }
}

module.exports = new UserService()
