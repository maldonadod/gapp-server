const SignUpBusiness = require('../SignUp/business')
const UserBusiness = require('../Users/business')
const {
  PromiseHandler
} = require('../../responses/PromiseHandler')
const {
  GetUserToken
} = require('../Auth/middleware')
const Provider = require('../../providers/Provider');

const providers = require('../../providers')
const {
  getProviderParamsFromReq
} = require('../../selectors/providers')

const getLoginPromise = req => {
  
  const {access_token,provider_name} = getProviderParamsFromReq(req)
  
  const provider = Provider.for(provider_name.toLowerCase())
  
  return provider.me(access_token)
  .then((profile) => {

    profile.provider_access_token = access_token

    return SignUpBusiness.register(profile)
  })
  .then(({_id}) => UserBusiness.findOne({_id}))
  .then(GetUserToken)
}

const post = PromiseHandler(getLoginPromise)

module.exports = {
  post
}
