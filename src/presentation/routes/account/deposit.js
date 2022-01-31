const Joi = require("joi")

function deposit(controller) {
  return async (req, res) => {
    try {
      const { accountNumber, value } = req.body
      const schema = Joi.object({
        accountNumber: Joi.number().required(),
        value: Joi.number().required()
      })
      const validated = await schema.validateAsync({ accountNumber, value })
      const depositValue = await controller.deposit(validated)
      res.status(200).json(depositValue)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = deposit
