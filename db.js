var mongoose = require('mongoose')
const DB_NAME = process.env.DB_NAME || 'test'

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useMongoClient: true
});
