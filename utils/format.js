const moment = require('moment')

module.exports = {
  formatdate: function (date) {
    if (!date) {
      return ''
    } else {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  formatUser: function (user) {
    delete user.password
    user.createdAt = this.formatTime(user.createdAt)
    user.updatedAt = this.formatTime(user.updatedAt)
  }
}
