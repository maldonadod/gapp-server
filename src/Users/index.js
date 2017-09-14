const UsersBusiness = require('./business')

module.exports = {

  get: (req, res) => {

    UsersBusiness.get()
    .then(users => {

      res.send({
        status: 'OK',
        data: users
      })
    })
    .catch(err => {
      console.log(err)
      res.send({
        status: 'OK',
        message: 'Something went wrong :P'
      })
    })
  }
}
