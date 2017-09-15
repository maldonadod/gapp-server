const UsersBusiness = require('./business')

const RegExpFactory = value => new RegExp(value, 'i')

module.exports = {

  get: (req, res) => {

    const {name} = req.query
    const params = {}

    if (name) {
      params.first_name = RegExpFactory(name)
    }

    UsersBusiness.get(params)
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
