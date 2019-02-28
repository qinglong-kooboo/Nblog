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
        const errorMsg = {
          status: 200,
          errCode: 20002,
          errMessage: 'USERNAME_NOT_EXISTED'
        }
        throw errorMsg
      }
      const password = findRes.password
      if (md5Decode(decodePassword(data.password)) !== password) {
        const errorMsg = {
          status: 200,
          errCode: 20003,
          errMessage: 'PASSWORD_IS_WRONG'
        }
        throw errorMsg
      }
      const result = format.formatUser(findRes)
      return result
    } catch (error) {
      throw error
    }
  }
  async register (data) {
    try {
      console.log(data.name)
      const findRes = await mdb.users.findOne({ name: data.name }, null, { lean: true })
      if (findRes) {
        const errorMsg = {
          status: 200,
          errCode: 20004,
          errMessage: 'USER_EXISTED'
        }
        throw errorMsg
      }
      data.password = md5Decode(decodePassword(data.password))
      const result = await mdb.users.create(data)
      return format.formatUser(result)
    } catch (error) {
      throw error
    }
  }
  async getUserByName (name) {
    try {
      const result = await mdb.users.findOne({ name: name }, null, { lean: true })
      if (!result) {
        const errorMsg = 'USER_NOT_EXISTED'
        throw errorMsg
      }
      return format.formatUser(result)
    } catch (error) {
      const errorMsg = 'USER_GET_FAILED'
      throw errorMsg
    }
  }
}

module.exports = new UserService()
