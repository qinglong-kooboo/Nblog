const Mongolass = require('mongolass')
const mongolass = new Mongolass()

exports.User = mongolass.model('User', {
  name: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
  avatar: {
    type: 'string',
    required: true
  },
  gender: {
    type: 'string',
    enum: ['m', 'f', 'x'],
    default: 'x'
  },
  bio: {
    type: 'string',
    required: true
  }
})

exports.User.createIndex({ name: 1 }, { unique: true }).exec()
