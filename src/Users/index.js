const UsersBusiness = require('./business')

const RegExpFactory = value => new RegExp(value, 'gi')

const OrQueries = params => ({ $or: params })

module.exports = {

  get: (req, res) => {

    const {name} = req.query
    let params = {}

    if (name) {
      const nameQuery = OrQueries([
        { first_name: RegExpFactory(name) },
        { last_name: RegExpFactory(name) }
      ])

      params = Object.assign({}, params, nameQuery)
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
