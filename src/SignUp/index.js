const SignUpBusiness = require('./business');

module.exports = {
  post: (req, res) => {

    SignUpBusiness.register(req.body)
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
