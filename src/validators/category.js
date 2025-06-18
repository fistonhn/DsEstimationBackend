import Joi from "joi";

const validateCreateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string()
      .max(255)
      .required(),
    code: Joi.string()
      .max(255)
  });

  return schema.validate(category);
};

export default validateCreateCategory;
