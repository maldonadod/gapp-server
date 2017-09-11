const login = (user, access_token) => {
  return user.updateAccessTokenProvider(access_token)
}


module.exports = {
  login
}
