const User = require('../../models/User')

const register = ({
  email
  ,password
}) => {

  return User.findOne({
    'authentication.email': email
  })
  .then(exists => {

    if (!exists) {

      const access_token = 'ds8da09s8d09a8s98da09s8d0a8sd098a'

      const user = {
        password,
        authentication: {
          email,
          access_token
        }
      }

      return new User(user)
        .save()
    } else {
      return Promise.reject('Email currently in use')
    }
}

module.exports = {
  register
}
