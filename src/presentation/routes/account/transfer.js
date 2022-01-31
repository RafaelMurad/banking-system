const Joi = require("joi")

function transfer(controller) {
  return async (req, res) => {
    try {
      const { accountNumber, accountNumberReceipt, value } = req.body
      const schema = Joi.object({
        accountNumber: Joi.number().required(),
        accountNumberReceipt: Joi.number().required(),
        value: Joi.number().required()
      })
      const validated = await schema.validateAsync({ accountNumber, accountNumberReceipt, value })
      const transferValue = await controller.transfer(validated)
      res.status(200).json(transferValue)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = transfer
