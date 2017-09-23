const {
  success
  ,error
} = require('../../responses');
const co = require('co');
const ChapterBusiness = require('./business');
const {
  getOptions
  ,parseResponse
} = require('../Pagination/business');

const get = (req, res) => {

  const {_id} = req.params
  const paginateOptions = getOptions(req.query)
  const params = {}
  let promise;
  let handler;
  if (_id) {
    params._id = _id
    promise = ChapterBusiness.getOne(params)

    handler = chapter => res.send(success(chapter))
  } else {
    promise = ChapterBusiness.paginate(params, paginateOptions)

    handler = chapters => {
      res.send(parseResponse(success(chapters)))
    }
  }

  promise
  .then(handler)
  .catch(err => res.send(error(err)))
}

const post = (req, res) => {

  const input = req.body

  ChapterBusiness.post(input)
  .then(chapter => res.send(success(chapter)))
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
}
