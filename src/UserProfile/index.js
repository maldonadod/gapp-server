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

    UserProfileBussiness
      .get()
      .then(data => res.send(good(data)))
      .catch(() => res.send(bad()))
  }

  return {
    get
  }
})()
