const User = require('../../models/User')
const Utils = require('../../models/utils')

const queryByName = query => Utils.mapFieldsToQueryRegex(['first_name', 'last_name'], query)

const get = params => {
  return User.find(params, User.USER_UNSELECTED_FIELDS)
}

const filterByFullName = query => Utils.mergeQueries([queryByName(query)])

module.exports = {
  get
  ,filterByFullName
}
