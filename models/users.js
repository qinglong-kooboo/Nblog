const Mongolass = require('mongolass')
const mongolass = new Mongolass()

exports.users = mongolass.model('users', {
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

exports.users.createIndex({ name: 1 }, { unique: true }).exec()
