const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')
const {
  Country
} = require('./Country')
const {
  ContactSchema
} = require('./Contact')

const User = new Schema({
  facebook_id: String,
  full_name: String,
  last_name: String,
  first_name: String,
  password: String,
  authentication: {
    regid: String,
    email: String,
    provider_name: {
      type: String,
      default: 'facebook'
    },
    provider_access_token: String,
    access_token: String
  },
  contacts: [ContactSchema],
  profile_picture: {},
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country'
  }
}, {
  collection: 'Users'
})

User.statics.USER_UNSELECTED_FIELDS = '-__v -authentication.access_token -password -facebook_id'
User.statics.DEFAULT_COUNTRY_ID = '59d2d92af5229f2947e927cb'

User.plugin(mongoosePaginate)

module.exports = mongoose.model('User', User)
