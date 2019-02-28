'use strict'
const _ = require('lodash')
module.exports = function (req, res, next) {
  const extendArr = {
    sendOk: (data) => {
      const rst = {
        status: 200,
        errorCode: 0,
        data: data
      }
      return res.send(_.extend(rst))
    },
    sendErr: (errorInfo) => {
      const rsa = {
        errMessage: errorInfo
      }
      return res.send(_.extend(rsa))
    }
  }
  _.extend(res, extendArr)
  next()
}
