const {
  bodyFromReq
} = require('./index')

const pipe = require('./pipe')

const access_token = ({access_token}) => ({access_token})
const provider_name = ({provider_name}) => ({provider_name})

const providerParameters = pipe(
  access_token
  ,provider_name
)

const getProviderParamsFromReq = bodyFromReq(providerParameters)

module.exports = {
  getProviderParamsFromReq
}
