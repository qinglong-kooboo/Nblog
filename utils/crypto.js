const crypto = require('crypto')
const settings = require('../config/settings')

exports.encrypt = function (inputPassword) {
  const hash = crypto.createCipheiv('bf', inputPassword, settings.saltKey)
    .update('yes i do', 'utf-8', 'hex')
    .final('hex')
  return hash
}
exports.decrypted = function (password) {
  const code = crypto.createDecipheriv('bf', password, settings.saltKey)
    .update('yes i do', 'utf-8', 'hex')
    .final('hex')
  return code
}
exports.checkPasswd = function (inputPassword, password) {
  if (inputPassword === password) {
    return true
  } else {
    return false
  }
}
