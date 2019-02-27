'use strict'
const _ = require('lodash')
module.exports = (req, res, next) => {
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
      return res.send(_.extend(errorInfo))
    }
  }
  _.extend(res, extendArr)
  next()
}
