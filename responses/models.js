const STATUS_OK = 'OK'
const STATUS_ERR = 'ERR'

const success = data => ({
  status: STATUS_OK
  ,data
})
const error = message => ({
  status: STATUS_ERR
  ,message
})

module.exports = {
  success
  ,error
}
