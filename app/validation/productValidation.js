import Joi from "joi";

const productDataValidation = (data) => {
  const schema = Joi.object({
    name: Joi.required().messages({
      "string.empty": "The name field is required.",
    }),
    price: Joi.number().min(1).required().messages({
      "number.base": "The price must be a number.",
      "string.min": "The price must be greater than 1.",
      "string.empty": "The price field is required.",
    }),
    stock: Joi.number().min(0).required().messages({
      "number.base": "The price must be a number.",
      "string.min": "The price must be greater than 1.",
      "string.empty": "The stock field is required.",
    }),
  });
  return schema.validate(data);
};

export default productDataValidation;
