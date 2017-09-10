class User {

  constructor(storage) {
    this.storage = storage
  }

  register(user) {
    this.storage.save(user)
  }
}

module.exports = User
