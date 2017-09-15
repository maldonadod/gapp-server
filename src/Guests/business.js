const User = require('../../models/User')

const get = params => {
  return User.find(params, User.USER_UNSELECTED_FIELDS)
}

module.exports = {
  get
}
