const User = require('../../models/User')

const register = ({
  email
  ,access_token
}) => {

    const provider = {
      facebook: access_token
    }

    const user = {
      email
      ,provider
    }

    return new User(user)
    .save()
}

module.exports = {
  register
}
