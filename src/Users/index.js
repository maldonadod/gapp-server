const UsersBusiness = require('./business')
const Utils = require('../../models/utils')

module.exports = {

  get: (req, res) => {

    const {name} = req.query
    let params = {}

    if (name) {
      params = UsersBusiness.filterByFullName(name)
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
