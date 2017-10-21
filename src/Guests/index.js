const GuestsBusiness = require('./business')
const UsersBusiness = require('../Users/business')
const {
  getOptions
  ,parseResponse
  ,paginateCollection
} = require('../Pagination/business')
const Utils = require('../../models/utils')
const ChaptersBusiness = require('../Chapters/business')

const {
  GUESTS_OK_STATUS, GUESTS_PENDING_STATUS, GUESTS_NOT_STATUS
} = require('../../models/Chapter')

const STATUS_OK = 'OK'
const STATUS_ERR = 'ERR'

const good = data => ({
  status: STATUS_OK,
  data: data
})
const bad = err => ({
  status: STATUS_ERR,
  message: err
})
const {
  PromiseHandlerPaginate
} = require('../../responses/PromiseHandler')

const {
  getGuestListPromise
} = require('./promises')

const get = PromiseHandlerPaginate(getGuestListPromise)

const byEvent = (req, res) => {

  const {chapter_id} = req.params
  const paginationOptions = getOptions(req.query)

  ChaptersBusiness.getOne({
    _id: chapter_id
  })
  .then(({guests}) => res.send(paginateCollection(paginationOptions, good(guests))))
  .catch(err => res.send(bad(err)))
}

const update = (req, res) => {

  const {
    chapter_id
    ,guest_id
  } = req.params

  const {
    status
  } = req.body

  GuestsBusiness.update(chapter_id, guest_id, {
    status
  })
  .then(data => res.send(good()))
  .catch(err => {
    res.send(bad(err))
  })
}

module.exports = {
  get
  ,update
  ,byEvent
}
