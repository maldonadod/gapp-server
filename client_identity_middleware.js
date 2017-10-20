const PLATFORM = 'x-platform'
const VERSION = 'x-version'


const CLIENT_IDENTITY = (req, res, next) => {
  
  const { headers } = req
  
  const platform = headers[PLATFORM]
  const version = headers[VERSION]
  
  req.client = {
    platform
    ,version
  }
  
  next()
}

module.exports = {
  CLIENT_IDENTITY
}