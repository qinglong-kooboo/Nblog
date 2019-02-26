const controllers = require('../controllers')
// const middleWares = require('../middlewares/check')

module.exports = function (app) {
  app.all('/test', controllers.testController.test)
  // app.get('/', controllers.articleController.list)
  // token验证
  // app.use(middleWares.verifyToken)
  // app.post('/article/create', controllers.articleController.create)
  // app.put('/article/update', controllers.articleController.update)
  // app.delete('/article/delete', controllers.articleController.delete)
  // app.use('/user', require('./users'))
  app.post('/user/login', controllers.usersController.login)
  // app.use('/posts', require('./article'))
  // app.use('/comments', require('./comments'))
}
