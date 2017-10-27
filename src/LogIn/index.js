const SignUpBusiness = require('../SignUp/business')
const UserBusiness = require('../Users/business')
const {
  PromiseHandler
} = require('../../responses/PromiseHandler')
const {
  GetUserToken
} = require('../Auth/middleware')

const providers = require('../../providers')
const {
  getProviderParamsFromReq
} = require('../../selectors/providers')

const getLoginPromise = req => {
  
  const {access_token,provider_name} = getProviderParamsFromReq(req)
  
  const provider = providers[provider_name]
  
  return provider.me(access_token)
  .then(SignUpBusiness.register)
  .then(({_id}) => UserBusiness.findOne({_id}))
  .then(GetUserToken)
}

const post = PromiseHandler(getLoginPromise)

module.exports = {
  post
}
