const mdb = require('../models')

module.exports = {
  async list () {
    try {
      const result = await mdb.articles.find({}, null, { lean: true })
      if (!result) {
        const errorMsg = {
          status: 200,
          errCode: 20010,
          errMessage: 'ARTICLE_IS_NONE'
        }
        throw errorMsg
      }
      return result
    } catch (error) {
      throw error
    }
  }
}
