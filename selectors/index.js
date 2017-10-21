const {
  getOptions
} = require('../src/Pagination/business')

const getPropertyAndPassToSelect = key => select => obj => obj[key] ? select(obj[key]) : select({})

const id = ({_id}) => ({_id})
const author = ({_id}) => ({author: _id})
const paginationOptions = paginationOptions => ({paginationOptions})
const name = ({name}) => ({name})

const loggedUserFromReq = getPropertyAndPassToSelect('loggedInUser')
const queryFromReq = getPropertyAndPassToSelect('query')

const getLoggedUserIdFromReq = loggedUserFromReq(id)
const getAuthorFromLoggedUser = loggedUserFromReq(author)
const getPaginateOptionsFromReq = queryFromReq(getOptions)

const getPaginationOptionsFromQueryReq = req => paginationOptions(getPaginateOptionsFromReq(req))
const getNameFromQueryReq = queryFromReq(name)

module.exports = {
  getLoggedUserIdFromReq
  ,getAuthorFromLoggedUser
  ,getPaginationOptionsFromQueryReq
  ,getNameFromQueryReq
  ,getPaginateOptionsFromReq
}