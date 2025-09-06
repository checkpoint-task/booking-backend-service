import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const joiPassword = Joi.extend(joiPasswordExtendCore);

const password = joiPassword
    .string()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1);

const name = Joi.string().regex(/^[A-Za-z]+ [A-Za-z]+$/);
const email = Joi.string().email();

export const schemaEmailNamePassword = Joi.object({
    email: email.required(),
    name: name.required(),
    password: password.required()
});




