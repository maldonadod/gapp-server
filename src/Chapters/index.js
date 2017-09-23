const {
  success
  ,error
} = require('../../responses');
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
  let success;
  if (_id) {
    params._id = _id
    promise = ChapterBusiness.getOne(params)

    success = chapter => res.send(success(chapter))
  } else {
    promise = ChapterBusiness.paginate(params, paginateOptions)

    success = chapters => {
      res.send(parseResponse(success(chapters)))
    }
  }

  promise
  .then(success)
  .catch(err => {
    res.send({
      status: 'ERR',
      message: err
    })
  })
}

const post = (req, res) => {

  const input = req.body

  ChapterBusiness.post(input)
  .then(chapter => {
    res.send({
      status: 'OK',
      data: chapter
    })
  })
  .catch(err => {
    res.send({
      status: 'ERR',
      message: err
    })
  })
}

const update = (req, res) => {

  const input = req.body
  const {_id} = req.params

  ChapterBusiness.update({_id}, input)
  .then(() => res.send(success()))
  .catch(err => res.send(error(err)))
}

module.exports = {
  get
  ,post
  ,update
}
