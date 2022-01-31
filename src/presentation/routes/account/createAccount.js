const Joi = require("joi")
const UserAlreadyExistsError = require("../../../shared/errors/UserAlreadyExistsError")

function createAccount(controller) {
  return async (req, res) => {
    try {
      const { fullName, cpf } = req.body
      const schema = Joi.object({
        fullName: Joi.string().min(3).required(),
        cpf: Joi.string().required()
      })
      const validated = await schema.validateAsync({ fullName, cpf })
      const user = await controller.create({ createdAt: new Date(), ...validated})

      res.status(201).json(user)
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        res.status(409).json({ message: err.message })
      }
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = createAccount
