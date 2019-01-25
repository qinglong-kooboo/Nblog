const mdb = require('../models')

export default class BaseService {
  model: string
  constructor (model: string) {
    this.model = model
  }
  async findOne (params) {
    try {
      const result = await mdb[this.model].findOne(params).exec()
    } catch (error) {
      throw new Error('something is wrong')
    }
  }
}
