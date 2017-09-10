const User = require('../../models/User')

const register = ({
  email
  ,password
}) => {

  return User.findOne({
    email
  })
  .then(exists => {

    if (!exists) {

      const user = {
        email
        ,password
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
