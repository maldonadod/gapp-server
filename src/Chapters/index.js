const {
  success
  ,error
} = require('../../responses')
const co = require('co')
const ChapterBusiness = require('./business')
const {
  getOptions
  ,parseResponse
} = require('../Pagination/business')

const {
  getLoggedUserIdFromReq
  ,getPaginateOptionsFromReq
} = require('../../selectors')

const {
  PromiseHandler
  ,PromiseHandlerPaginate
} = require('../../responses/PromiseHandler')
  
const getPromise = req => {
  const {_id} = req.params
  return ChapterBusiness.getOne({_id})
}

const getInvitationPromise = req => {
  const {_id} = getLoggedUserIdFromReq(req)
  const params = { user: _id }
  return ChapterBusiness.paginate(ChapterBusiness.InvitationQuery(params), getPaginateOptionsFromReq(req))
}

const get = PromiseHandler(getPromise)

const invitation = PromiseHandlerPaginate(getInvitationPromise)

const post = (req, res) => {

  const input = Object.assign({}, res.locals)
  const {
    _id
  } = getLoggedUserIdFromReq(req)
  
  input.author = _id

  ChapterBusiness.post(input)
  .then(({_id}) => {
    ChapterBusiness.getOne({_id})
    .then(chapter => res.send(success(chapter)))
  })
  .catch(err => res.send(error(err)))
}

const update = (req, res) => {

  const input = req.body
  const {_id} = req.params

  co(function* update() {

    const chapter = yield ChapterBusiness.getOne({_id})

    if (chapter === null) {
      return res.status(404).send(null)
    }

    const updated = yield ChapterBusiness.update({_id}, input)

    return res.status(200).send(success())
  })
  .catch(err => res.send(error(err)))
}

module.exports = {
  get
  ,post
  ,update
  ,invitation
}
