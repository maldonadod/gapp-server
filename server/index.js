const express = require('express')

const app = express()

const PORT = process.env.PORT || 9052

app.get('/', (req, res) => {
  res.send('Gapp')
});

app.listen(PORT, function() {
  console.log(`Listening at ${PORT}`)
})
