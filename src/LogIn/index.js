const LogInBusiness = require('./business')
const UserBusiness = require('../Users/business')
const {
  handlerPromise
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
  .then(({_id}) => {
    return UserBusiness.findOne({
      _id
    })
  })
}

const post = handlerPromise(getPromise)

module.exports = {
  post
}
