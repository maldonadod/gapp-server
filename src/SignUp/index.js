const SignUpBusiness = require('./business');
const {
  handlerPromise
} = require('../../responses/PromiseHandler');
const {
  GetUserToken
} = require('../Auth/middleware')
const {
  Hash
} = require('../Auth/business')

module.exports = (() => {

  const post = () => {
    const getPromise = req => {
      const {password} = req.body

      return Hash(password)
      .then(hashpassword => {
        const input = Object.assign({}, req.body, {
          password: hashpassword
        })
        return SignUpBusiness.register(input)
        .then(GetUserToken)
      })
    }
    return handlerPromise(getPromise)
  }

  return {
    post
  }
})()
