const User = require('../../models/User')

const get = params => {
  return User.find(params, User.USER_UNSELECTED_FIELDS)
}

const getPaginate = (params,paginationOptions) => {
  paginationOptions.select = User.USER_UNSELECTED_FIELDS
  return User.paginate(params, paginationOptions)
}

module.exports = {
  get
  ,getPaginate
}
