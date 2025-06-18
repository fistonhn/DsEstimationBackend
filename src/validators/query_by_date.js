import Joi from "joi";

const validatefromAndEndDate = (date) => {
  const schema = Joi.object({
    from: Joi.date().required(),
    end: Joi.date().required(),
  });

  return schema.validate(date);
};
export default validatefromAndEndDate;
