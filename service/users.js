'use strict'
const { md5Decode, decodePassword } = require('../utils/crypto')
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
  async register (data) {
    try {
      const findRes = await mdb.users.findOne({ name: data.name }, null, { lean: true })
      if (findRes) {
        throw new Error('USER_EXISTED')
      }
      const password = md5Decode(decodePassword(data.password))
      data.password = password
      const result = await mdb.user.create(data)
      return format.formatUser(result)
    } catch (error) {
      throw error
    }
  }
}

module.exports = new UserService()
