const filterGuests = jest.fn((params, paginationOptions) => {
  
  console.log(params, paginationOptions)
  
  return 'hola'
})

module.exports = {
  filterGuests
}