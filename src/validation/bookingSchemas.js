import Joi from "joi";

const date = Joi.date();
const id = Joi.string().guid({ version: "uuidv4" });

export const schemaBooking = Joi.object({
    startDate: date.required(),
    endDate: date.required().greater(Joi.ref("startDate")),
    roomId: id.required(),
    userId: id.required(),
});