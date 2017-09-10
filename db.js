var mongoose = require('mongoose')
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1/test'

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
  useMongoClient: true
})
.catch(err => console.log(err));
