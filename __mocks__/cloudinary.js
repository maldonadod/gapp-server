const uploader = {
  upload_stream: cb => {
    cloudinary.cb = cb
    return cloudinary
  }
}
const cover = {
  secure_url: 'http://localhost/'
}
const cloudinary = {
  getCover: () => cover,
  config: () => {},
  write: () => {},
  end: function() {
    cloudinary.cb(cover)
  },
  uploader: uploader
}

module.exports = cloudinary