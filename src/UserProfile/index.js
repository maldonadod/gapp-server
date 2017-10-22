const UserProfileBussiness = require('./business')
const UsersBusiness = require('../Users/business')
const ChaptersBusiness = require('../Chapters/business')

const {
  getLoggedUserIdFromReq
  ,getPaginateOptionsFromReq
  ,getAuthorFromLoggedUser
} = require('../../selectors')

const {
  PromiseHandler
  ,PromiseHandlerPaginate
} = require('../../responses/PromiseHandler')

module.exports = (function() {
  
  const getUserPromise = getParams => (req, res) => UsersBusiness.findOne(getParams(req))
  
  const getMyChapterPromise = getParams => getPaginateOptions => (req, res) => {
    return ChaptersBusiness.paginate(getParams(req), getPaginateOptions(req))
  }
 
  // create handlers
  const get = PromiseHandler(getUserPromise(getLoggedUserIdFromReq))
  const getMyChapters = PromiseHandlerPaginate(getMyChapterPromise(getAuthorFromLoggedUser)(getPaginateOptionsFromReq))
 
  const getUpdatePromise = (req, res) => {
    
    const input = Object.assign({}, res.locals)
    const {
      _id
    } = getLoggedUserIdFromReq(req)
    
    return UsersBusiness.update({_id}, input)
  }
 
  const update = PromiseHandler(getUpdatePromise)
 
  return {
    get
    ,getMyChapters
    ,update
  }
})()
