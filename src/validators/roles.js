import Joi from "joi";

const validateRole = (role) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    // righs is an array of strings
    permissions: Joi.array()
      .items(Joi.string().valid("read", "edit", "add", "delete", "admin"))
      .required(),
  });

  return schema.validate(role);
};

export default validateRole;
