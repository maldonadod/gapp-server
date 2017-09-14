const User = require('../../models/User')

const get = () => {
  return User.find({}, User.USER_UNSELECTED_FIELDS)
}

module.exports = {
  get
}
