import * as Joi from 'joi';

export const ReportValidationSchema = Joi.object().keys({
    reportee: Joi.string().required().error(new Error("user_id is missing!")),
    reporter: Joi.string().required().error(new Error("Person who reported is missing")),
    comment: Joi.string().required().error(new Error("Comment is missing!"))
})
