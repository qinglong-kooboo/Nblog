'use strict'
const service = require('../service')
const jwt = require('../utils/auth')

exports.login = (req, res) => {
  console.log(11111)
  service.user.login(req.body)
    .then((response) => {
      const token = jwt.createToken(response.id)
      response.token = token
      res.sendOk(response)
    }).catch((error) => {
      res.sendErr(error)
    })
}
exports.register = (req, res) => {
  service.user.register(req.body)
    .then((response) => {
      let result = response
      const token = jwt.createToken(result.id)
      result.token = token
      res.sendOk(result)
    }).catch((error) => {
      res.sendErr(error)
    })
}
exports.getUserByName = (req, res) => {
  service.user.getUserByName(req.query.name).then((response) => {
    res.sendOk(response)
  }).catch((error) => {
    res.sendErr(error)
  })
}
