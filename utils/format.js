const moment = require('moment')

module.exports = {
  formatdate: function (date) {
    if (!date) {
      return ''
    } else {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  formatUser: function (data) {
    delete data.password
    data.createdAt = this.formatTime(data.createdAt)
    data.updatedAt = this.formatTime(data.updatedAt)
    if (data.lastLogin) {
      data.lastLogin = this.formatDate(data.lastLogin)
    } else {
      data.lastLogin = '暂无登录记录'
    }
    return data
  }
}
