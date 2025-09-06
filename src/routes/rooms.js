import express from "express";
import roomsService from "../service/RoomsService.js";
import asyncHandler from "express-async-handler";
import { valitator } from "../middleware/validation.js";
import { schemaFilter } from "../validation/filterSchemas.js";
import { userRateLimiter } from "../middleware/rateLimit.js";


const roomsRouter = express.Router();

roomsRouter.get("/search", valitator(schemaFilter, "body"), asyncHandler(async (req, res) => {
    res.send(await roomsService.getRooms(req.body));
}));

export default roomsRouter;