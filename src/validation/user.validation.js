import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).max(30).required(),
}).unknown(false); ;

export const loginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().required(),
}).unknown(false); ;

export const emptyQuerySchema = Joi.object({}).unknown(false);
