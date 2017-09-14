const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  last_name: String,
  first_name: String,
  password: String,
  authentication: {
    email: String,
    access_token: String
  },
  profile_picture: String
}, {
  collection: 'Users'
})

User.statics.USER_UNSELECTED_FIELDS = '-__v -authentication.access_token -password'

module.exports = mongoose.model('User', User)
