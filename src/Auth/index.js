const LogInBusiness = require('../LogIn/business')
const SignUpBusiness = require('../SignUp/business');
const User = require('../../models/User');
const graph = require('fbgraph');

const findUser = id => (
  User.findOne({
    id
  })
  .catch(err => {
    console.log(err)
  })
)

const formatReponse = user => {
  const {
    id
    ,name
    ,provider
  } = user

  return {
    status: 'OK',
    data: {
      id
      ,name
      ,provider
      ,token: user._id
    }
  }
}
const formatUser = res => user => res.send(formatReponse(user))

const formatError = err => ({
  status: 'ERR',
  message: err
})
const formatErrorRes = res => err => res.send(formatErrorRes(err))

module.exports = {

  auth: (req, res) => {

    const {
      email,
      access_token
    } = req.body

    graph.setAccessToken(access_token);

    graph.get('me', (err, {id,name}) => {

      findUser(id)
      .then(user => {
        let promise;

        const formatUserAndSend = formatUser(res)
        const resError = formatErrorRes(res)

        if (user === null) {

          SignUpBusiness.register({
            id,
            name,
            access_token
          })
          .catch(resError)
          .then(formatUserAndSend)
        } else {

          LogInBusiness.login(user, access_token)
          .catch(resError)
          .then(formatUserAndSend)
        }
      })
    })
  }
}
