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

// APPLY MIDDLEWARES
server.use(ERROR_HANDLER)
server.use(API_KEY_MIDDLEWARE)
server.use(EXTRACT_ACCESS_TOKEN)
server.use(VALIDATE_USER_ID_FROM_REQ)
server.use(ERROR_HANDLER)

routes.forEach(REGISTER_ROUTE)

// DISPATCH
server.listen(PORT, DISPATCH_CALLBACK)

