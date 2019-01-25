const _ = require('lodash')
module.exports = function (res, req, next) {
  const extendArr = {
    sendOk: function (data) {
      res.send({
        status: 200,
        errorCode: 0,
        data: data
      })
    },
    sendError: function (errorInfo) {
      res.send(errorInfo)
    }
  }
  _.extend(res, extendArr)
  next()
}
