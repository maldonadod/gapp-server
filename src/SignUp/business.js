const User = require('../../models/User')

const register = ({
  id
  ,name
  ,access_token
}) => {

    const provider = {
      facebook: access_token
    }

    const user = {
      id
      ,name
      ,provider
    }

    return new User(user)
    .save()
}

module.exports = {
  register
}
