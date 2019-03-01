const service = require('../service')
class ArticleController {
  async getAllArticles (req, res) {
    try {
      const result = await service.articles.list()
      res.sendOk(result)
    } catch (error) {
      res.sendErr(error)
    }
  }
}

module.exports = new ArticleController()
