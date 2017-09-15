const ChapterBusiness = require('./business');
const PaginationBusiness = require('../Pagination/business');

const get = (req, res) => {

  const {_id} = req.params
  const paginateOptions = PaginationBusiness.getOptions(req.query)
  const params = {}
  let promise;

  if (_id) {
    params._id = _id
    promise = ChapterBusiness.getOne(params)
  } else {
    promise = ChapterBusiness.paginate(params, paginateOptions)
  }

  promise
  .then(chapters => {
    res.send({
      status: 'OK',
      data: chapters
    })
  })
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

module.exports = {
  get
  ,post
}
