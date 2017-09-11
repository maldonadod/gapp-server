const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const db = require('../db')

app.use(bodyParser.json({extended: true}))

const {
  auth
} = require('../src/Auth')

const PORT = process.env.PORT || 9052

app.get('/', (req, res) => {
  res.send('Gapp')
});

app.post('/auth', auth);

app.listen(PORT, function() {
  console.log(`Listening at ${PORT}`)
})
