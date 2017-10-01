const UserProfileBussiness = require('./business')
const UsersBusiness = require('../Users/business')
const ChaptersBusiness = require('../Chapters/business')

const {
  getLoggedUserIdFromReq
  ,getPaginateOptionsFromReq
  ,getAuthorFromLoggedUser
} = require('../../selectors')

const {
  handlerPromise
  ,handlerPromisePagination
} = require('../../responses/PromiseHandler')

module.exports = (function() {
  
  const getUserPromise = getParams => (req, res) => UsersBusiness.findOne(getParams(req))
  
  const getMyChapterPromise = getParams => getPaginateOptions => (req, res) => {
    return ChaptersBusiness.paginate(getParams(req), getPaginateOptions(req))
  }
 
  // create handlers
  const get = handlerPromise(getUserPromise(getLoggedUserIdFromReq))
  const getMyChapters = handlerPromisePagination(getMyChapterPromise(getAuthorFromLoggedUser)(getPaginateOptionsFromReq))
 
  return {
    get
    ,getMyChapters
  }
})()
