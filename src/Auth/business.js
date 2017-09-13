const jwt = require('jsonwebtoken');
const {
  AUTH_TOKEN_SAUCE
} = require('./constants')

module.exports = {
  UserToken: payload => jwt.sign(payload, AUTH_TOKEN_SAUCE)
}
