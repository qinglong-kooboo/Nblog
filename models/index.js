const users = require('./users')
const articles = require('./articles')
// const comment = require('./comments')

const mdb = {}
mdb.users = users
mdb.articles = articles
// mdb.article = article
// mdb.comment = comment

module.exports = mdb
