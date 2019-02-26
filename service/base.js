'use strict'
const mdb = require('../models')

class BaseService {
  constructor (model) {
    this.model = model
  }
  async findOne (params) {
    try {
      const result = await mdb[this.model].findOne(params, null, { lead: true })
      return result
    } catch (error) {
      const errorMessage = 'NO_FIND'
      throw errorMessage
    }
  }
}

module.exports = BaseService
