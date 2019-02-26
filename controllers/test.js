class TestController {
  async test (req, res) {
    try {
      console.log('controller')
      res.send({ data: 'request success!' })
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new TestController()
