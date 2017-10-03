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

const getSignUpPromise = req => {
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

const post = handlerPromise(getSignUpPromise)

module.exports = {
  post
}
