const User = require('../../models/User')
const UserBusiness = require('../Users/business')

const register = (profile) => {
  const {
    facebook_id
    ,first_name
    ,last_name
    ,full_name
    ,profile_picture
    ,provider_access_token
    ,regid = ""
  } = profile

  return User.findOne({
    facebook_id
  })
  .then(exists => {
    if (!exists) {

      const user = {
        facebook_id,
        full_name,
        first_name,
        last_name,
        country: User.DEFAULT_COUNTRY_ID,
        profile_picture,
        authentication: {
          regid,
          provider_access_token,
          access_token: null
        }
      }

      return new User(user).save()
    }
    return exists
  })
}

module.exports = {
  register
}
