const express = require('express')
const server = express()
const PORT = process.env.PORT || 9052
const store = require('../store')
const {
  errorAction
} = require('../store/actions')

const ERROR_HANDLER = (err, req, res, next) => {
  const {status = 200,message = null} = err
  store.dispatch(errorAction(err))
  return res.status(status).send(message)
}

const REGISTER_ROUTE = ({method, path, handlers}) => {
  server[method].call(server, path, ...handlers)
}

const DISPATCH_CALLBACK = () => console.log(`Listening at ${PORT}`)

module.exports = {
  server
  ,ERROR_HANDLER
  ,PORT
  ,DISPATCH_CALLBACK
  ,REGISTER_ROUTE
}
