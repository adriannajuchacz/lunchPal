import * as Joi from 'joi';

export const UserRegistrationValidationSchema = Joi.object().keys({
    first_name: Joi.string().required().error(new Error("Please complete the First Name field as it appears to be empty or has a bad format!")),
    last_name: Joi.string().required().error(new Error("Please complete the Last Name field as it appears to be empty or has a bad format!")),
    password: Joi.string().required().error(new Error("Please complete the Password field as it appears to be empty or has a bad format!")),
    email: Joi.string().email().regex(/campus.tu-berlin.de$/).required().error(new Error("Please complete the Email field as it appears to be empty or it's not a TU Berlin Email Address  !")),
    blocked: Joi.bool()
})
