import usersController from './users'
const articleController = require('./article')

const controllers = {}
controllers.usersController = usersController
controllers.articleController = articleController

module.exports = controllers
