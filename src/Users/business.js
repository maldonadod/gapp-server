const User = require('../../models/User')
const Utils = require('../../models/utils')

const queryByName = query => Utils.mapFieldsToQueryRegex(['first_name', 'last_name'], query)

const get = params => {
  return User.find(params, User.USER_UNSELECTED_FIELDS)
}

const filterByFullName = query => Utils.mergeQueries([queryByName(query)])

const findOne = params => {
  return User.findOne(params, User.USER_UNSELECTED_FIELDS)
}

module.exports = {
  get
  ,filterByFullName
  ,findOne
}
