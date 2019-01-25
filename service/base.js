const mdb = require('../models')

class BaseService {
  constructor (model) {
    this.model = model
  }
  async findOne (params) {
    try {
      const result = await mdb[this.model].findOne(params).exec()
      return result
    } catch (error) {
      throw new Error('something is wrong')
    }
  }
}

module.exports = BaseService
