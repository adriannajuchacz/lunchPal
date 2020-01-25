import * as Joi from 'joi';

export const UserLoginValidationSchema = Joi.object().keys({
    email: Joi.string().email().regex(/campus.tu-berlin.de$/).required().error(new Error("Please complete the Email field as it appears to be empty or it's not a TU Berlin Email Address  !")),
    password: Joi.string().required().error(new Error("Please complete the Password field as it appears to be empty or has a bad format!"))
})
