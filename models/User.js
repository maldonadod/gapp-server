const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')

const User = new Schema({
  last_name: String,
  first_name: String,
  password: String,
  authentication: {
    regid: String,
    email: String,
    access_token: String
  },
  profile_picture: String,
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country'
  }
}, {
  collection: 'Users'
})

User.statics.USER_UNSELECTED_FIELDS = '-__v -authentication.access_token -password'
User.statics.DEFAULT_COUNTRY_ID = '59d2d92af5229f2947e927cb'

User.plugin(mongoosePaginate)

module.exports = mongoose.model('User', User)
