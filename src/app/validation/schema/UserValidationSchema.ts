import Joi from 'joi';
class UserValidationSchema {
  constructor() { }

  static addUserSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    mobilNumber: Joi.number().required()
  })
  static userLogin =Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
  static getUserSchema = Joi.object({
    id: Joi.number().positive().required()
  })

 
}
export default UserValidationSchema;