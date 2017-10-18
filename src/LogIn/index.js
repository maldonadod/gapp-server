const LogInBusiness = require('./business')
const UserBusiness = require('../Users/business')
const {
  PromiseHandler
} = require('../../responses/PromiseHandler')
const {
  GetUserToken
  ,CheckPassword
} = require('../Auth/middleware')

const getPromise = req => {
  const {password,email} = req.body
  return LogInBusiness.login({password,email})
  .then(GetUserToken)
  .then(CheckPassword.bind(null, password))
  .then(user => {
    return UserBusiness.findOne({
      _id: user._id
    })
    .then(({country}) => {

      return Object.assign({}, user.toObject(), {
        country
      })
    })
  })
}

const post = PromiseHandler(getPromise)

module.exports = {
  post
}
