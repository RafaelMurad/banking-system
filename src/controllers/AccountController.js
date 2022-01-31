class AccountController {
  #accountRepository = null

  constructor(accountRepository) {
    this.#accountRepository = accountRepository
  }

  async create(account) {
    await this.userAlreadyExists(account.cpf)

    const accountNumber = await this.#accountRepository.findAll().then((accounts) => accounts.length + 1)

    const newAccount = {
      ...account,
      accountNumber
    }

    const client = await this.#accountRepository.insert(newAccount)
    const added = await this.findById(client.insertedId)
    return added
  }

  async userAlreadyExists(cpf) {
    const user = await this.#accountRepository.findByCpf(cpf)
    if (user) throw new Error("User already exists")
  }

  async findById(id) {
    const user = await this.#accountRepository.findById(id)
    return user
  }

  async findByAccountNumber(accountNumber) {
    const account = await this.#accountRepository.findByAccountNumber(accountNumber)
    return account
  }

  async deposit(updateData) {
    const account = await this.findByAccountNumber(updateData.accountNumber)
    if (!account) throw new Error("Account not found")

    if (updateData.value <= 0) throw new Error("Value must be greater than zero")
    if (updateData.value > 2000) throw new Error("Value must be less than 2000")

    updateData.value = account.balance + updateData.value

    await this.#accountRepository.update(account.accountNumber, updateData)

    const updated = await this.findByAccountNumber(account.accountNumber)
    return updated
  }

  async transfer(updateData) {
    const account = await this.findByAccountNumber(updateData.accountNumber)
    if (!account) throw new Error("Sender Account not found")

    const accountReceipt = await this.findByAccountNumber(updateData.accountNumberReceipt)
    if (!accountReceipt) throw new Error("Receipt Account not found")

    if (updateData.value <= 0) throw new Error("Value must be greater than zero")
    if (updateData.value > 2000) throw new Error("Value must be less than 2000")
    if (account.balance - updateData.value < 0) throw new Error("Insufficient funds")

    const updateDataSender = {
      value: account.balance - updateData.value
    }

    const updateDataReceipt = {
      value: accountReceipt.balance + updateData.value
    }

    await this.#accountRepository.update(account.accountNumber, updateDataSender)
    await this.#accountRepository.update(accountReceipt.accountNumber, updateDataReceipt)

    const receipted = await this.findByAccountNumber(accountReceipt.accountNumber)
    const updated = await this.#accountRepository.findByAccountNumber(account.accountNumber)
    return { receipted, updated }
  }
}

module.exports = { AccountController }
