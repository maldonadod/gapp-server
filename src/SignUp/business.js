const User = require('../../models/User')

const register = ({
  email
  ,password
}) => {

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
}

module.exports = {
  register
}
