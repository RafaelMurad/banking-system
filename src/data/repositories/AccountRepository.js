const { ObjectId } = require("mongodb")

class AccountRepository {
  #connection = null
  #collection = null

  constructor(connection) {
    this.#connection = connection
    this.#collection = this.#connection.collection("accounts")
  }

  async insert(account) {
    return this.#collection.insertOne({ ...account, balance: 0 })
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

  async findByAccountNumber(accountNumber) {
    return this.#collection.findOne({ accountNumber })
  }

  async update(account, updateData) {
    return this.#collection.updateOne(
      { accountNumber: account },
      {
        $set: {
          balance: updateData.value
        }
      }
    )
  }
}

module.exports = { AccountRepository }
