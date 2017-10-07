const jwte = require('express-jwt')

const {
  UserToken
  ,HashCompare
} = require('./business');

const {
  AUTH_TOKEN_SAUCE
} = require('./constants')

const UserBusiness = require('../Users/business')

const GetUserToken = user => {
  user.authentication.access_token = UserToken({
    _id: user._id
  })
  return Promise.resolve(user)
}

const CheckPassword = (plain_password, user) => {
  return HashCompare(plain_password, user.password)
  .then(same => {
    if (same) {
      return user
    }
    return Promise.reject('Invalid')
  })
}

const API_KEY_ID = 'x-api-key'

const UnauthorizedError = {
  name: 'UnauthorizedError',
  status: 401,
  message: null
}

const API_KEY_MIDDLEWARE = (req, res, next) => {
  if (req.headers[API_KEY_ID] !== process.env.API_KEY) {
    return next(UnauthorizedError)
  }
  return next()
}

const VALIDATE_USER_ID_FROM_REQ = (req, res, next) => {
  if (!req.user) { return next() }

  UserBusiness.findOne({
    _id: req.user._id
  })
  .then(user => {
    if (!user) {
      return next({
        name: 'UnauthorizedError'
      })
    }
    req.loggedInUser = Object.assign({}, user.toJSON())
    return next()
  })
}

const PUBLIC_ENDPOINTS = ['/login', '/signup', '/']
const EXTRACT_ACCESS_TOKEN = jwte({secret: AUTH_TOKEN_SAUCE}).unless({path: PUBLIC_ENDPOINTS})

module.exports = {
  GetUserToken
  ,CheckPassword
  ,API_KEY_MIDDLEWARE
  ,EXTRACT_ACCESS_TOKEN
  ,VALIDATE_USER_ID_FROM_REQ
}
