const auth = require('../utils/auth')
exports.verifyToken = function (req, res, next) {
  const header = req.header
  const token = header.token
  if (!token) {
    res.send('token丢失')
  }
  try {
    auth.verifyToken(token)
    next()
  } catch (err) {
    res.sendError(err)
  }
}
