const {
  UserToken
  ,HashCompare
} = require('./business');

const GetUserToken = user => {
  user.authentication.access_token = UserToken({
    _id: user._id
  })
  return Promise.resolve(user)
}

const CheckPassword = (plain_password, user) => {
  return HashCompare(plain_password, user.password)
  .then(same => {
    if (same) {
      return user
    }
    return Promise.reject('Invalid')
  })
}

module.exports = {
  GetUserToken
  ,CheckPassword
}
