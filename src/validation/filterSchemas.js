import Joi from "joi";

const date = Joi.date();
const positiveNumber = Joi.number().greater(0);

export const schemaFilter = Joi.object({
    startDate: date.required(),
    endDate: date.required().greater(Joi.ref("startDate")),
    guests: positiveNumber.required(),
    location: Joi.string(),
    page: positiveNumber,
    limit: positiveNumber
});