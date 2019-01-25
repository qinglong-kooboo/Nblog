import UsersController from './users'
import ArticleController from './article'

const controllers = {}
const usersController = new UsersController()
const articleController = new ArticleController()
controllers.usersController = usersController
controllers.articleController = articleController

module.exports = controllers
