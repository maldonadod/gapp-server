const confirmPassword = (p, cp) => p === cp

const register = data => {

  const {
    username
    ,password
    ,confirm_password
  } = data

  if (!confirmPassword(password, confirm_password)) {
    return Promise.reject('Password does not match')
  }

  return Promise.resolve(data)
}

module.exports = {
  register
}
