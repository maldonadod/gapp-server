const User = require('../../models/User')

const register = ({
  email
  ,first_name
  ,last_name
  ,password
  ,profile_picture = ""
  ,regid = ""
}) => {

  return User.findOne({
    'authentication.email': email
  })
  .then(exists => {

    if (!exists) {

      const user = {
        email,
        first_name,
        last_name,
        password,
        profile_picture,
        authentication: {
          email,
          regid,
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
