import Joi from "joi";

const validateProject = (project) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().allow(''),
    client: Joi.string().min(3).allow(''),
    contractor: Joi.string().min(3).allow(''),
    consultant: Joi.string().min(3).allow(''),
    startDate: Joi.date().allow(null).allow(''),
    endDate: Joi.date().allow(null),
    status: Joi.string().valid(
      "not started",
      "on progress",
      "suspended",
      "canceled",
      "completed"
    ),
    currencyCode: Joi.string().default("RWF"),
    currencyValue: Joi.number().default(1),
    vat: Joi.number().default(0),
    category: Joi.string().allow(''),
    groupId: Joi.number(),

  });
  return schema.validate(project);
};

export default validateProject;
