const {
  routes
} = require('./index')

test('Map of routes should match snapshot', () => {
  
  expect(routes).toMatchSnapshot()
})