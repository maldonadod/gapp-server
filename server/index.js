const express = require('express')

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json({extended: true}))

const SignUp = require('../src/SignUp')

const PORT = process.env.PORT || 9052

app.get('/', (req, res) => {
  res.send('Gapp')
});

app.post('/signup', SignUp.post);

app.listen(PORT, function() {
  console.log(`Listening at ${PORT}`)
})
