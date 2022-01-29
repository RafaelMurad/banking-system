const express = require("express")

const { createConnection } = require("../data/connection/mongodb")
const { UserRepository } = require("../data/repositories/UserRepository")
const { UserController } = require("../controllers/UserController")

const { createUser } = require("./routes")

async function start() {
  const app = express()
  const port = process.env.PORT || 3000

  const connection = await createConnection({
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DBNAME
  })

  const userRepository = new UserRepository(connection)
  const userController = new UserController(userRepository)

  app.use(express.json())

  app.post("/users", createUser(userController))

  app.listen(port, () => {
    console.log(`Server starter on port ${port}`)
  })
}

module.exports = { start }
