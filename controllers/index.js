const TestController = require('./test')
const UsersController = require('./users')
// const ArticleController = require('./article')

const controllers = {}
controllers.usersController = UsersController
controllers.testController = TestController
// controllers.articleController = ArticleController

module.exports = controllers
