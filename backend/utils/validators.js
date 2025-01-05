const Joi = require('joi');

exports.validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().optional(),
    role: Joi.string().valid('user', 'admin').optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};


exports.validateProduct = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required(),
    category: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};