'use strict'
const crypto = require('crypto')
const { Base64 } = require('js-base64')
const format = require('../utils/format')
const BaseService = require('./base')
const mdb = require('../models')

class UserService extends BaseService {
  constructor (model) {
    super(model)
    this.model = 'User'
  }
  async login (data) {
    try {
      const findRes = await mdb.users.findOne(
        {
          name: data.name // conditions
        },
        null, // 映射（只返回映射所需要的数据）
        {
          lean: true // 将返回的mongoose对象转换为js object
        })

      if (!findRes) {
        const errorMsg = 'USERNAME_IS_WRONG'
        throw errorMsg
      }
      // md5加密
      const md5Decode = (password) => {
        return crypto.createHash('md5').update(password).digest('hex')
      }
      // 密码编码
      const decodePassword = (pwd) => {
        return Base64.decode(pwd)
      }
      const password = findRes.password
      if (md5Decode(decodePassword(data.password)) !== password) {
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
