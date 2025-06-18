import Joi from "joi";

export const validateUserRegister = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
    accessLevel: Joi.array().items(
      Joi.string().valid("readonly", "write", "edit", "delete", "admin")
    ),
    readOnlyProjectIds: Joi.array().items(Joi.number()),
    writeProjectIds: Joi.array().items(Joi.number()),
    editProjectIds: Joi.array().items(Joi.number()),
    deleteProjectIds: Joi.array().items(Joi.number()),
    adminProjectIds: Joi.array().items(Joi.number()),
  });

  return schema.validate(user);
};

export const validateUserLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(user);
};
export const validateEmail = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
  });
  return schema.validate(data);
};
