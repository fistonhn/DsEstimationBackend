import Joi from "joi";

const validateCurrency = (currency) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    code: Joi.string().max(255).required(),
    value: Joi.number().required(),
  });

  return schema.validate(currency);
};

export default validateCurrency;
