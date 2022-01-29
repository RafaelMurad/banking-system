const { ObjectId } = require("mongodb")

class UserRepository {
  #connection = null
  #collection = null

  constructor(connection) {
    this.#connection = connection
    this.#collection = this.#connection.collection("users")
  }

  async insert(user) {
    return this.#collection.insertOne(user)
  }

  async findByCpf(cpf) {
    return this.#collection.findOne({ cpf })
  }

  async findAll() {
    return this.#collection.find().toArray()
  }

  async findById(id) {
    return this.#collection.findOne({ _id: new ObjectId(id) })
  }
}

module.exports = { UserRepository }
