const {
  success
  ,error
} = require('./models')

const {
  parseResponse
} = require('../src/Pagination/business')

const promiseHandlerFactory = (success, error) => getPromise => (req, res) => {
  return getPromise(req, res)
  .then(success(res))
  .catch(error(res))
}

const _express_res_send = res => body => res.send(body)

// DIGEST BEFORE SEND FLOW
// plugin access to response object - returns a function
// api_model access to response data - returns object
// res response obj
// raw response data
const digestFlow = plugin => api_model => res => raw => plugin(res)(api_model(raw))

// COMPOSING
const _disgestExpress = digestFlow(_express_res_send) // prepare for communicate with Response 
const _digestError = _disgestExpress(error) // digest error case
const _digestSuccess = _disgestExpress(success) // digest error case

const PromiseHandler = promiseHandlerFactory(_digestSuccess, _digestError)

const paginate = data => parseResponse(success(data))
const _digestSuccessPagination = _disgestExpress(paginate)
const PromiseHandlerPaginate = promiseHandlerFactory(_digestSuccessPagination, _digestError)

module.exports = {
  PromiseHandler
  ,PromiseHandlerPaginate
  ,promiseHandlerFactory
}
