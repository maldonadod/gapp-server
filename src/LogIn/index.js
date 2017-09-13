const LogInBusiness = require('./business')
const {
  GetUserToken
} = require('../Auth/middleware')

module.exports = {
  post: (req, res) => {

    LogInBusiness.login(req.body)
    .then(GetUserToken)
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
