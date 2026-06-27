const Joi = require('joi');

const ingestItemSchema = Joi.object({
  productId: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().integer().min(0).required() 
});

module.exports = { ingestItemSchema };