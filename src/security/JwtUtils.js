import jwt from "jsonwebtoken";
import config from "config";
import convertTimeStrToInt from "../utils/convertTimeStrToInt.js";

export default class JwtUtils {

    static getJwt(seviceAccount) {
        return jwt.sign(
            { userId: seviceAccount.userId },
            process.env.JWT_SECRET,
            { subject: seviceAccount.email, expiresIn: convertTimeStrToInt(config.get("accounting.expired_in")) + "" }
        );
    }

    static verifyJwt(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }

}