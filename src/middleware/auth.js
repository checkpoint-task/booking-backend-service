import { createError } from "../errors/errors.js";
import JwtUtils from "../security/JwtUtils.js";
import accountsService from "../service/AccountsService.js";
import expressAsyncHandler from "express-async-handler";

const BEARER = "Bearer ";

export function authenticate() {
    return async (req, res, next) => {
        const authHeader = req.header("Authorization");
        if (authHeader) {
            if (authHeader.startsWith(BEARER)) {
                await jwtAuthentication(req, authHeader);
            }
        }
        next();
    };
}

async function jwtAuthentication(req, authHeader) {
    const token = authHeader.substring(BEARER.length);
    try {
        const payload = JwtUtils.verifyJwt(token);
        req.user = payload.sub;
        req.authType = "jwt";
    } catch (error) {
    }
}

export function checkAuthentication(paths) {
    return expressAsyncHandler(async (req, res, next) => {
        const { authentication } = paths[req.method][req.route.path];
        if (authentication(req)) {
            if (req.authType !== authentication(req)) {
                throw createError(401, "authentication error");
            }
        }
        next();
    });
}