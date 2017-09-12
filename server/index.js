const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const db = require('../db')

app.use(bodyParser.json({extended: true}))

const Sign = require('../src/SignUp')
const Login = require('../src/LogIn')

const UserProfile = require('../src/UserProfile')

const PORT = process.env.PORT || 9052

const HomeHandler = (req, res) => {
  res.send('G ~ OnLine')
}

app.get('/', HomeHandler)

app.post('/signup', Sign.post);
app.post('/login', Login.post);

// Middlewares

const Auth = (req, res, next) => {
  // logic

  next()
}

app.get('/profile/me', Auth, UserProfile.get)

app.listen(PORT, function() {
  console.log(`Listening at ${PORT}`)
})
