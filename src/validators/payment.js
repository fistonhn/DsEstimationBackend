import Joi from "joi";

const paymentPlanValidation = (plan) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    amount: Joi.number().required(),
    interval: Joi.string()
      .valid(
        "yearly",
        "every 6 months",
        "monthly",
        "quarterly",
        "weekly",
        "daily",
        "hourly"
      )
      .required(),
    currency: Joi.string().required().valid("USD", "RWF"),
  });
  return schema.validate(plan);
};

export default paymentPlanValidation;
