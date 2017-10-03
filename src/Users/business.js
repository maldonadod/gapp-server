const User = require('../../models/User')
const Utils = require('../../models/utils')

const queryByName = query => Utils.mapFieldsToQueryRegex(['first_name', 'last_name'], query)

const country = {
  path: 'country',
  select: '-_id -__v'
}

const get = params => {
  return User.find(params, User.USER_UNSELECTED_FIELDS)
  .populate(country)
}

const filterByFullName = query => Utils.mergeQueries([queryByName(query)])

const findOne = params => {
  return User.findOne(params, User.USER_UNSELECTED_FIELDS)
  .populate(country)
}

const getPaginate = (params,paginationOptions) => {
  paginationOptions.select = User.USER_UNSELECTED_FIELDS
  paginationOptions.populate = [
    country
  ]
  return User.paginate(params, paginationOptions)
}

module.exports = {
  get
  ,filterByFullName
  ,findOne
  ,getPaginate
}
