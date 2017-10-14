const cloudinary = require('cloudinary')
const Busboy = require('busboy')
const {
  CLOUDINARY_CLOUD_NAME
  ,CLOUDINARY_API_KEY
  ,CLOUDINARY_API_SECRET
} = process.env

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME
  ,api_key: CLOUDINARY_API_KEY
  ,api_secret: CLOUDINARY_API_SECRET
});

const merge = (...items) => {
  console.log('merge: ', items)
  return Object.assign({}, ...items)
}

module.exports = (req, res, next) => {
  
  console.log('MIDDLEWARE 2', req.chapter);
  
  const busboy = new Busboy({ headers: req.headers });

  const stream = cloudinary.uploader.upload_stream(cover => {
    console.log('Upload: ', cover)
    const {secure_url} = cover
    res.locals = merge(res.locals, {
      cover: {
        url: secure_url
      }
    })
    next()
  })
  
  busboy.on('err',  err => console.log(err))
  busboy.on('error',  err => console.log(err))

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log('file!')
    file.on('data', stream.write).on('end', stream.end)
  })

  busboy.on('field', (field, value) => {
    console.log('busboy on field: ', field, value)
    const body = JSON.parse(value)
    res.locals = merge(res.locals, body)
    console.log('set chapter:', res.locals)
  })
  
  req.pipe(busboy)
}