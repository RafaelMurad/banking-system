const { UserAlreadyExistsError } = require("../shared/errors")

class UserController {
  #userRepository = null

  constructor(userRepository) {
    this.#userRepository = userRepository
  }

  async create(user) {
    await this.userAlreadyExists(user.cpf)

    const client = await this.#userRepository.insert(user)
    const added = await this.findById(client.insertedId)
    return added
  }

  async userAlreadyExists(cpf) {
    const user = await this.#userRepository.findByCpf(cpf)
    if (user) throw new UserAlreadyExistsError()
  }

  async findById(id) {
    const user = await this.#userRepository.findById(id)
    return user
  }
}
module.exports = { UserController }
