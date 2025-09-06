import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import convertTimeStrToInt from "../utils/convertTimeStrToInt.js";
import config from "config";

export const userRateLimiter = rateLimit({
    windowMs: convertTimeStrToInt(config.get("limitation.user_requests_time")),
    max: config.get("limitation.user_requests_count"),
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req, res) => req.authType === "jwt" ? `user:${req.user}` : ipKeyGenerator(req.ip),
});