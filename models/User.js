const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  email: String,
  provider: {}
}, {
  collection: 'User'
})

User.methods.updateAccessTokenProvider = function(access_token) {
  this.set({
    provider: {
      facebook: access_token
    }
  })

  return this.save()
}

module.exports = mongoose.model('User', User)
