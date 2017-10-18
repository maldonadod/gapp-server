function FCM() {
}

FCM.prototype.send = jest.fn((payload, regids) => {
  return Promise.resolve(payload)
})

module.exports = FCM