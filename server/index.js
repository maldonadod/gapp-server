const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('../db')
var jwte = require('express-jwt')
const {
  AUTH_TOKEN_SAUCE
} = require('../src/Auth/constants')

app.use(bodyParser.json({extended: true}))

const Sign = require('../src/SignUp')
const Login = require('../src/LogIn')
const Chapters = require('../src/Chapters')
const Users = require('../src/Users')

const UserProfile = require('../src/UserProfile')

const PORT = process.env.PORT || 9052

const HomeHandler = (req, res) => {
  res.send('G ~ OnLine')
}

app.use(jwte({secret: AUTH_TOKEN_SAUCE}).unless({path: ['/login', '/signup', '/']}))

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token');
  }
});

app.get('/', HomeHandler)

app.post('/signup', Sign.post);
app.post('/login', Login.post);

//AUTHORIZATION REQUIRED
app.get('/profile/me', UserProfile.get)
app.get('/events/:_id?', Chapters.get)
app.post('/events', Chapters.post)
app.get('/users', Users.get)

app.listen(PORT, function() {
  console.log(`Listening at ${PORT}`)
})
