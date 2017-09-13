const {
  UserToken
} = require('./business');

module.exports = {

  GetUserToken: user => {
    user.authentication.access_token = UserToken({
      _id: user._id
    })
    return Promise.resolve(user)
  }
}
