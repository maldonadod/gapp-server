// ROUTES HANDLERS
const Sign = require('../src/SignUp')
const Login = require('../src/LogIn')
const Chapters = require('../src/Chapters')
const Users = require('../src/Users')
const Guests = require('../src/Guests')
const Contacts = require('../src/Contacts')
const Places = require('../src/Places')
const UserProfile = require('../src/UserProfile')
const HomeHandler = (req, res) => res.send('G ~ OnLine')
const ChapterFileUpload = require('../upload/chapter_file_upload')
const UserAvatarFileUpload = require('../upload/user_avatar_upload')

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
    method: 'patch',
    path: '/profile/me',
    handlers: [UserAvatarFileUpload, UserProfile.update]
  }
  ,{
    method: 'get',
    path: '/profile/me/events',
    handlers: [UserProfile.getMyChapters]
  }
  ,{
    method: 'get',
    path: '/events/:_id',
    handlers: [Chapters.get]
  }
  ,{
    method: 'get',
    path: '/events',
    handlers: [Chapters.invitation]
  }
  ,{
    method: 'post',
    path: '/events',
    handlers: [ChapterFileUpload, Chapters.post]
  }
  ,{
    method: 'patch',
    path: '/events/:_id',
    handlers: [Chapters.update]
  }
  ,{
    method: 'get',
    path: '/contacts',
    handlers: [Contacts.get]
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