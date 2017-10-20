require('dotenv').config()

const db = require('./db')

const {
  routes
} = require('./routes')

const {
  server
  ,ERROR_HANDLER
  ,PORT
  ,DISPATCH_CALLBACK
  ,REGISTER_ROUTE
} = require('./server')

const {
  API_KEY_MIDDLEWARE
  ,EXTRACT_ACCESS_TOKEN
  ,VALIDATE_USER_ID_FROM_REQ
} = require('./src/Auth/middleware')

// BODY PARSER
const bodyParser = require('body-parser')
server.use(bodyParser.json({ extended: true }))

// MORGAN
const morgan = require('morgan')
server.use(morgan('dev'))

const {
  CLIENT_IDENTITY
} = require('./client_identity_middleware')

// APPLY MIDDLEWARES
server.use(CLIENT_IDENTITY)
server.use(API_KEY_MIDDLEWARE)
server.use(EXTRACT_ACCESS_TOKEN)
server.use(VALIDATE_USER_ID_FROM_REQ)

routes.forEach(REGISTER_ROUTE)

server.use(ERROR_HANDLER)

// DISPATCH
server.listen(PORT, DISPATCH_CALLBACK)

