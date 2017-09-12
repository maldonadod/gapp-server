const LogInBusiness = require('./business')

module.exports = {
  post: (req, res) => {

    LogInBusiness.login(req.body)
    .then(user => {

      res.send({
        status: 'OK',
        data: user
      })
    })
    .catch(err => {

      res.send({
        status: 'ERR',
        message: err
      })
    })
  }
}
