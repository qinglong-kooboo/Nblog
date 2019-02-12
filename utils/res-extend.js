const _ = require('lodash')
module.exports = function (res, req, next) {
  const extendArr = {
    sendOk: (data) => {
      const rst = {
        status: 200,
        errorCode: 0,
        data: data
      }
      return res.send(_.extend(rst))
    },
    sendError: (errorInfo) => {
      return res.send(_.extend(errorInfo))
    }
  }
  _.extend(res, extendArr)
  next()
}
