import Joi from "joi";

const transactionSchema = Joi.object({
  description: Joi.string().required(),
  value: Joi.number().integer().greater(0),
  type: Joi.any().valid("entrada", "saida").required(),
});

export { transactionSchema };
