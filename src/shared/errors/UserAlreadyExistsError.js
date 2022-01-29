class UserAlreadyExistsError extends Error {
  constructor() {
    super(`User already registered`)
  }
}

module.exports = UserAlreadyExistsError
