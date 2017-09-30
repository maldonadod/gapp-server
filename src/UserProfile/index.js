const UserProfileBussiness = require('./business')
const UsersBusiness = require('../Users/business')
const ChaptersBusiness = require('../Chapters/business')
const {
  getOptions
  ,parseResponse
} = require('../Pagination/business');

const {
  success
  ,error
} = require('../../responses')

module.exports = (function() {

  const getLoggedUserIdFromReq = req => ({_id: req.loggedInUser._id})
  
  const getPaginateOptionsFromReq = ({query}) => getOptions(query)

  const getAuthorFromLoggedUser = ({loggedInUser}) => ({author: loggedInUser._id})

  const getUserPromise = getParams => (req, res) => {
    return UsersBusiness.findOne(getParams(req))
  }
  const successPagination = success => parseResponse => data => parseResponse(success(data))
  const formatAndResponse = format => res => data => res.send(format(data))
  const responseSuccessPagination = formatAndResponse(successPagination(success)(parseResponse))
  const responseSuccess = formatAndResponse(success)
  const responseError = formatAndResponse(error)
  
  const handlerPromiseFactory = success => error => getPromise => (req, res) => {
    getPromise(req)
    .then(success(res))
    .catch(error(res))
  }
  
  const handlerPromise = handlerPromiseFactory(responseSuccess)(responseError)
  const handlerPromisePagination = handlerPromiseFactory(responseSuccessPagination)(responseError)
  
  const getMyChapterPromise = getParams => getPaginateOptions => (req, res) => {
    const params = getParams(req)
    const paginationOptions = getPaginateOptions(req)
    return ChaptersBusiness.paginate(params, paginationOptions)
  }
 
  // create handlers
  
  const get = handlerPromise(getUserPromise(getLoggedUserIdFromReq))
  const getMyChapters = handlerPromisePagination(getMyChapterPromise(getAuthorFromLoggedUser)(getPaginateOptionsFromReq))
 
  return {
    get
    ,getMyChapters
  }
})()
