import express from "express";
import asyncHandler from "express-async-handler";
import { valitator } from "../middleware/validation.js";
import { schemaBooking } from "../validation/bookingSchemas.js";
import bookingsService from "../service/BookingsService.js";
import bookingsPaths from "../paths/bookingsPaths.js";
import { checkAuthentication } from "../middleware/auth.js";


const bookingsRouter = express.Router();

bookingsRouter.post("/", valitator(schemaBooking, "body"), checkAuthentication(bookingsPaths), asyncHandler(async (req, res) => {
    const {roomId, userId, startDate, endDate} = req.body;
    res.send(await bookingsService.bookRoom(roomId, userId, startDate, endDate));
}));

export default bookingsRouter;