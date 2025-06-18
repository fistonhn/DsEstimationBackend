import Joi from "joi";

const validateEquipment = (equipment) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    caveragePerUnit: Joi.number().allow(null),
    unit: Joi.string().required(),
    hireRatePrice: Joi.number().required(),
    number: Joi.number().default(1),
    supplierId: Joi.number().allow(null),
    currency: Joi.string().required().default("RWF"),
  });

  return schema.validate(equipment);
};
export default validateEquipment;
