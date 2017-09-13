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

      const user = {
        password,
        authentication: {
          email,
          access_token: null
        }
      }

      return new User(user)
        .save()
    } else {
      return Promise.reject('Email currently in use')
    }
  })
}

module.exports = {
  register
}
