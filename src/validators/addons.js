import Joi from "joi";

const validateProjectAddons = (addons) => {
  const schema = Joi.object({
    reasons: Joi.string()
      .min(3)
      .required()
      .error(new Error("Addons reason is required")),
    appliedTo: Joi.string()
      .min(3)
      .required()
      .error(new Error("where addons will applied is required")),
    amount: Joi.number()
      .required()
      .error(new Error("Addons percentage is required")),
  });
  return schema.validate(addons);
};

export default validateProjectAddons;
