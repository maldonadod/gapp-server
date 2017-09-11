const User = require('../../models/User')

const register = ({
  email
  ,access_token
}) => {

  return User.findOne({
    email
  })
  .then(exists => {

    if (!exists) {

      const provider = {
        facebook: access_token
      }

      const user = {
        email
        ,provider
      }

      return new User(user)
      .save()
      .then(res => {
        user.token = res._id
        return user
      })
    } else {
      return Promise.reject('Email currently in use')
    }
  })
}

module.exports = {
  register
}
