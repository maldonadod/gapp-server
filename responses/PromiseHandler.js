const {
  success
  ,error
} = require('../responses')

const {
  parseResponse
} = require('../src/Pagination/business')

const successPagination = success => parseResponse => data => parseResponse(success(data))
const formatAndResponse = format => res => data => res.send(format(data))
const responseSuccessPagination = formatAndResponse(successPagination(success)(parseResponse))
const responseSuccess = formatAndResponse(success)
const responseError = formatAndResponse(error)

const handlerPromiseFactory = success => error => getPromise => (req, res) => {
  return getPromise(req)
  .then(success(res))
  .catch(error(res))
}

const handlerPromise = handlerPromiseFactory(responseSuccess)(responseError)
const handlerPromisePagination = handlerPromiseFactory(responseSuccessPagination)(responseError)

module.exports = {
  handlerPromiseFactory
  ,handlerPromise
  ,handlerPromisePagination
}