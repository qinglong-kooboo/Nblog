'use strict'
const service = require('../service')
const jwt = require('../utils/auth')

exports.login = (req, res) => {
  console.log(11111)
  service.user.login(req.body)
    .then((response) => {
      const token = jwt.createToken(response.id)
      response.token = token
      res.send(response)
    }).catch((error) => {
      res.send(error)
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
      res.send(error)
    })
}
exports.getUserByName = (req, res) => {
  console.log(req.query.name)
  service.user.getUserByName(req.query.name).then((response) => {
    res.send(response)
  }).catch((error) => {
    res.send(error)
  })
}
