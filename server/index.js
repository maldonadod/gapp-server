const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const db = require('../db')

app.use(bodyParser.json({extended: true}))

const SignUp = require('../src/SignUp')
const LogIn = require('../src/LogIn')

const PORT = process.env.PORT || 9052

app.get('/', (req, res) => {
  res.send('Gapp')
});

app.post('/signup', SignUp.post);

app.post('/login', LogIn.post);

app.listen(PORT, function() {
  console.log(`Listening at ${PORT}`)
})
