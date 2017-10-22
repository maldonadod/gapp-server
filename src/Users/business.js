const User = require('../../models/User')
const Utils = require('../../models/utils')

const queryByName = input => Utils.mapFieldsToQueryRegex(['first_name', 'last_name'], input)

const country = {
  path: 'country',
  select: '-_id -__v'
}

const get = params => {
  return User.find(params, User.USER_UNSELECTED_FIELDS)
  .populate(country)
}

const findOne = params => {
  return User.findOne(params, User.USER_UNSELECTED_FIELDS)
  .populate(country)
}

const getPaginate = (params,paginationOptions) => {
  console.log('params: ', params)
  paginationOptions.select = User.USER_UNSELECTED_FIELDS
  paginationOptions.populate = [
    country
  ]
  return User.paginate(params, paginationOptions)
}

const update = ({_id}, input) => User.update({_id}, { $set: input })

module.exports = {
  get
  ,findOne
  ,queryByName
  ,getPaginate
  ,update
}
