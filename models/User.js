const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  email: String,
  provider: {}
}, {
  collection: 'User'
})

module.exports = mongoose.model('User', User)
