const express = require("express")

const { createConnection } = require("../data/connection/mongodb")
const { AccountRepository } = require("../data/repositories/AccountRepository")
const { AccountController } = require("../controllers/AccountController")

const { createAccount, deposit, transfer } = require("./routes")

async function start() {
  const app = express()
  const port = process.env.PORT || 3000

  const connection = await createConnection({
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DBNAME
  })

  const accountRepository = new AccountRepository(connection)
  const accountController = new AccountController(accountRepository)

  app.use(express.json())

  app.post("/accounts", createAccount(accountController))
  app.patch("/deposits", deposit(accountController))
  app.patch("/transfers", transfer(accountController))

  app.listen(port, () => {
    console.log(`Server starter on port ${port}`)
  })
}

module.exports = { start }
