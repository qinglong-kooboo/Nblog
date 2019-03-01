const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: { type: String, default: '' },

  content: { type: String, default: '' },

  createAt: { type: Date, default: Date.now },

  updateAt: { type: Date, default: Date.now },

  countInfo: {
    commentCount: {type: Number, default: 0},
    visitCount: {type: Number, default: 0},
    likeCount: {type: Number, default: 0}
  }
})
module.exports = mongoose.model('articles', ArticleSchema)
