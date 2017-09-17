const SignUpBusiness = require('./business');
const {
  GetUserToken
} = require('../Auth/middleware')
const {
  Hash
} = require('../Auth/business')

module.exports = {
  post: (req, res) => {

    const {password} = req.body

    Hash(password)
    .then(hashpassword => {

      const input = Object.assign({}, req.body, {
        password: hashpassword
      })

      SignUpBusiness.register(input)
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
    })
  }
}
