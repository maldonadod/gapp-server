const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const saltRounds = 10
const {
  AUTH_TOKEN_SAUCE
} = require('./constants')

const HashCompare = (chunk, hash) => {
  return bcrypt.compare(chunk, hash)
}

const Hash = chunk => {
  return bcrypt.hash(chunk, saltRounds)
}

const UserToken = payload => jwt.sign(payload, AUTH_TOKEN_SAUCE)

module.exports = {
  UserToken
  ,Hash
  ,HashCompare
}
