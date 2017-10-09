// ROUTES HANDLERS
const Sign = require('../src/SignUp')
const Login = require('../src/LogIn')
const Chapters = require('../src/Chapters')
const Users = require('../src/Users')
const Guests = require('../src/Guests')
const Places = require('../src/Places')
const UserProfile = require('../src/UserProfile')
const HomeHandler = (req, res) => res.send('G ~ OnLine')

const cloudinary = require('cloudinary')
const Busboy = require('busboy')

const {
  CLOUDINARY_CLOUD_NAME
  ,CLOUDINARY_API_KEY
  ,CLOUDINARY_API_SECRET
} = process.env

const upload = (req, res, next) => {
  
  console.log('Headers: ', req.headers)
  console.log('Body: ', req.body)
  
  cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME
    ,api_key: CLOUDINARY_API_KEY
    ,api_secret: CLOUDINARY_API_SECRET
  });
  
  const stream = cloudinary.uploader.upload_stream(upload => {

    req.chapter = Object.assign({}, req.chapter, {
      cover: Object.assign({}, upload)
    })
    
    next()
  });

  const busboy = new Busboy({ headers: req.headers });

  busboy.on('err',  err => console.log(err))
  busboy.on('error',  err => console.log(err))
  
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    file.on('data', stream.write).on('end', stream.end)
  })
  
  busboy.on('field', function(field, value) {
    console.log(field, value)
  })

  req.pipe(busboy)
}

const routes = [
  {
    method: 'get',
    path: '/',
    handlers: [HomeHandler]
  }
  ,{
    method: 'post',
    path: '/signup',
    handlers: [Sign.post]
  }
  ,{
    method: 'post',
    path: '/login',
    handlers: [Login.post]
  }
  ,{
    method: 'get',
    path: '/places',
    handlers: [Places.get]
  }
  ,{
    method: 'get',
    path: '/places',
    handlers: [Places.get]
  }
  ,{
    method: 'get',
    path: '/profile/me',
    handlers: [UserProfile.get]
  }
  ,{
    method: 'get',
    path: '/profile/me/events',
    handlers: [UserProfile.getMyChapters]
  }
  ,{
    method: 'get',
    path: '/events/:_id?',
    handlers: [Chapters.get]
  }
  ,{
    method: 'post',
    path: '/events',
    handlers: [upload, Chapters.post]
  }
  ,{
    method: 'patch',
    path: '/events/:_id',
    handlers: [Chapters.update]
  }
  ,{
    method: 'get',
    path: '/users',
    handlers: [Guests.get]
  }
  ,{
    method: 'get',
    path: '/events/:chapter_id/guests',
    handlers: [Guests.byEvent]
  }
  ,{
    method: 'patch',
    path: '/events/:chapter_id/guests/:guest_id',
    handlers: [Guests.update]
  }
]

module.exports = {
  routes
}