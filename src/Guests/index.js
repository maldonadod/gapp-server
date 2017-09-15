const GuestsBusiness = require('./business')
const UsersBusiness = require('../Users/business')
const PaginationBusiness = require('../Pagination/business')
const Utils = require('../../models/utils')

const get = (req, res) => {

  const {_id} = req.user
  const {name} = req.query
  const paginationOptions = PaginationBusiness.getOptions(req.query)
  let params = {}

  let defaultParams = {
    _id: {
      $ne: _id
    }
  }

  if (name) {
    params = UsersBusiness.filterByFullName(name)
  }

  params = Utils.mergeQueries([defaultParams, params])

  GuestsBusiness.getPaginate(params, paginationOptions)
  .then(guests => res.send({
    status: 'OK',
    data: guests
  }))
  .catch(err => res.send(err))
}

module.exports = {
  get
}
