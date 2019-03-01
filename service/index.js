const users = require('./users')
const articles = require('./articles')

const service = {}
service.users = users
service.articles = articles

module.exports = service
