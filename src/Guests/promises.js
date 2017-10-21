const GuestsBusiness = require('./business')
const UsersBusiness = require('../Users/business')

const {
  getLoggedUserIdFromReq
  ,getPaginationOptionsFromQueryReq
  ,getNameFromQueryReq
} = require('../../selectors')

const pipeSelectors = require('../../selectors/pipe')

const getParamsFromReq = pipeSelectors(
  getLoggedUserIdFromReq
  ,getNameFromQueryReq
  ,getPaginationOptionsFromQueryReq
)

const getGuestListPromise = req => {

  const {
    _id
    ,name
    ,paginationOptions
  } = getParamsFromReq(req)
  
  return GuestsBusiness.filterGuests({_id, name}, paginationOptions)
}

module.exports = {
  getGuestListPromise
}