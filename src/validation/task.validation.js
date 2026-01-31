import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().trim(),
  description: Joi.string().max(500).allow("").trim(),
}).unknown(false);

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).trim(),
  description: Joi.string().max(500).allow("").trim(),
  status: Joi.string().valid("pending", "completed"),
}).unknown(false);

export const searchTaskSchema = Joi.object({
  keyword: Joi.string().min(1).max(100).trim().allow(""),
  status: Joi.string().valid("pending", "completed").allow(""),
}).unknown(false);

export const taskIdParamSchema = Joi.object({
  taskId: Joi.number().integer().positive().required(),
});

export const emptyQuerySchema = Joi.object({});
