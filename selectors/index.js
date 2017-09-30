const {
  getOptions
} = require('../src/Pagination/business')

const getPropertyAndPassToSelect = key => select => obj => select(obj[key])

const id = ({_id}) => ({_id})
const author = ({_id}) => ({author: _id})

const loggedUserFromReq = getPropertyAndPassToSelect('loggedInUser')
const queryFromReq = getPropertyAndPassToSelect('query')

const getLoggedUserIdFromReq = loggedUserFromReq(id)
const getAuthorFromLoggedUser = loggedUserFromReq(author)
const getPaginateOptionsFromReq = queryFromReq(getOptions)

module.exports = {
  getLoggedUserIdFromReq
  ,getPaginateOptionsFromReq
  ,getAuthorFromLoggedUser
}