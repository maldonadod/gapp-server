const LogInBusiness = require('./business')
const {
  handlerPromise
} = require('../../responses/PromiseHandler')
const {
  GetUserToken
  ,CheckPassword
} = require('../Auth/middleware')

module.exports = (() => {

  const post = () => {
    const getPromise = req => {
      const {password,email} = req.body
      return LogInBusiness.login({password,email})
      .then(GetUserToken)
      .then(CheckPassword.bind(null, password))
    }
    return handlerPromise(getPromise)
  }

  return {
    post
  }
})()
