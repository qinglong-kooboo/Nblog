'use strict'
const { md5Decode, decodePassword } = require('../utils/crypto')
const format = require('../utils/format')
// const BaseService = require('./base')
const mdb = require('../models')

exports.login = (data) => {
  return new Promise((resolve, reject) => {
    mdb.user.findOne(
      {
        name: data.name // conditions
      },
      null, // 映射（只返回映射所需要的数据）
      {
        lean: true // 将返回的mongoose对象转换为js object
      }).then((res) => {
      let findRes = res
      const password = findRes.password
      if (md5Decode(decodePassword(data.password)) !== password) {
        const errorMsg = 'PASSWORD_IS_WRONG'
        throw errorMsg
      }
      const result = format.formatUser(findRes)
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}
exports.register = (data) => {
  return new Promise((resolve, reject) => {
    mdb.user.findOne({ name: data.name }, null, { lean: true }).then((response) => {
      if (response) {
        reject(response)
      }
      const password = md5Decode(decodePassword(data.password))
      data.password = password
      mdb.user.create(data).then((response) => {
        let result = response
        resolve(format.formatUser(result))
      }).catch((error) => {
        reject(error)
      })
    }).catch((error) => {
      reject(error)
    })
  })
}
exports.getUserByName = (name) => {
  return new Promise((resolve, reject) => {
    mdb.user.findOne({ name: name }, null, { lean: true }).then((response) => {
      resolve(format.formatUser(response))
    }).catch((error) => {
      reject(error)
    })
  })
}
