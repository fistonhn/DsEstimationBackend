import Joi from "joi";

export const validateCreateEstimation = (estimation) => {
  const schema = Joi.object({
    name: Joi.string()
      .max(255)
      .required()
      .error(new Error("Estimation Name is required")),
    estimationUnit: Joi.string()
      .required()
      .error(new Error("Estimation Unit is required")),
    estimationQuantity: Joi.number()
      .required()
      .error(new Error("Estimation Quantity is required")),
    categoryId: Joi.number()
      .required()
      .error(new Error("Category is required")),
    subcategoryId: Joi.number(),
  });

  return schema.validate(estimation);
};

