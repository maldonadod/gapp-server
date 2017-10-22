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
  return Object.assign({}, ...items)
}

module.exports = format => (req, res, next) => {
  
  const busboy = new Busboy({ headers: req.headers });

  const stream = cloudinary.uploader.upload_stream(cover => {
    const formatted = format(cover)
    res.locals = merge(res.locals, formatted)
    next()
  })

  busboy.on('err', next)
  busboy.on('error', next)

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    file.on('data', stream.write).on('end', stream.end)
  })

  busboy.on('field', (field, value) => {
    const body = JSON.parse(value)
    res.locals = merge(res.locals, body)
  })
  
  req.pipe(busboy)
}
