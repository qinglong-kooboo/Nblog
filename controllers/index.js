const TestController = require('./test')
const UserController = require('./user')
const ArticleController = require('./article')

const controllers = {}
controllers.user = UserController
controllers.test = TestController
controllers.article = ArticleController
// controllers.articleController = ArticleController

module.exports = controllers
