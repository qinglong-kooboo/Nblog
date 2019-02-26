const crypto = require('crypto')
const { Base64 } = require('js-base64')

// md5加密
exports.md5Decode = (password) => {
  return crypto.createHash('md5').update(password).digest('hex')
}

// 密码编码
exports.decodePassword = (pwd) => {
  return Base64.decode(pwd)
}
