const LogInBusiness = require('../LogIn/business')
const SignUpBusiness = require('../SignUp/business');
const User = require('../../models/User');

module.exports = {

  auth: (req, res) => {

    const {
      email,
      access_token
    } = req.body

    return User.findOne({
      email
    })
    .then(user => {

      let promise;

      if (user === null) {
        promise = SignUpBusiness.register({
          email,
          access_token
        })
      } else {
        promise = LogInBusiness.login(user, access_token)
      }

      promise
      .then(user => {
        const {email, provider} = user
        res.send({
          status: 'OK',
          data: {
            email
            ,provider
            ,token: user._id
          }
        })
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
