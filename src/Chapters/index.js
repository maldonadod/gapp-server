const ChapterBusiness = require('./business');

const get = (req, res) => {

  const {_id} = req.params

  const params = {}

  if (_id) {
    params._id = _id
  }

  ChapterBusiness.get(params)
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