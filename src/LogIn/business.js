const User = require('../../models/User');

const login = ({
  email
  ,access_token
}) => {

  return User.findOne({
    email
  })
  .then(user => {

    if (user === null) {
      return Promise.reject('Dont know that email')
    }

    return user.updateAccessTokenProvider(access_token)
      .then(user => {
        const {email, provider} = user
        return {
          email
          ,provider
          ,token: user._id
        }
      })
  })
}


module.exports = {
  login
}
