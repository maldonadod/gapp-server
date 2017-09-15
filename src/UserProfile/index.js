const UserProfileBussiness = require('./business')

module.exports = (function() {

  const good = profile => ({
    status: 'OK',
    data: profile
  })

  const bad = err => ({
    status: 'ERR',
    message: err
  })

  const get = (req, res) => {

    res.send(good(req.loggedInUser))
  }

  return {
    get
  }
})()
