const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Crypto = require('crypto')

const UserSchema = new Schema({
  name: { type: String, required: 'name is required' },

  slogan: { type: String, default: '' },

  gravatar: { type: String, default: '../public/img/default_logo.jpg' },

  password: {
    type: String,
    default: Crypto.createHash('md5').update('root').digest('hex')
  }
})
module.exports = mongoose.model('users', UserSchema)
