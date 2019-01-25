const users = require('./users')
const article = require('./article')
const comment = require('./comments')

const mdb = {}
mdb.users = users
mdb.article = article
mdb.comment = comment

module.exports = mdb
