const User = require('../../models/User');

const login = ({
  email
  ,password
}) => {

  return User.findOne({
    'authentication.email': email
  })
  .then(user => {
    if (user === null) {
      return Promise.reject('Invalid')
    }
    return user
  })
}

module.exports = {
  login
}
