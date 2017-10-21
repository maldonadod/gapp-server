const pipe = (...fns) => message => {
  const result = {}

  fns.reduce((a, b) => {
    const chunk = b(a)
    Object.assign(result, chunk)
    return message
  }, message)

  return result
}

module.exports = pipe 