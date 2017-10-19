const errorAction = error => ({
  error
  ,type: 'SUPER_ERROR'
})

module.exports = {
  errorAction
}