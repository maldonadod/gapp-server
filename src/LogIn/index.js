const LogInBusiness = require('./business')
const {
  GetUserToken
  ,CheckPassword
} = require('../Auth/middleware')

module.exports = {
  post: (req, res) => {
    const {password,email} = req.body

    LogInBusiness.login({password,email})
    .then(GetUserToken)
    .then(CheckPassword.bind(null, password))
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
