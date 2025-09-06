import knex from "knex"
import { development } from "../../knexfile.js";
import { createError } from "../errors/errors.js";
import { v4 as uuidv4 } from "uuid";

class BookingsRepo {
    #db

    constructor() {
        this.#db = new knex(development)
    }

    async createBooking(roomId, userId, startDate, endDate) {
        return await this.#db.transaction(async (trx) => {

            const room = await trx("rooms").where({ room_id: roomId }).first();
            if (!room) {
                throw createError(404, "Room not found");
            }

            const user = await trx("users").where({ user_id: userId }).first();
            if (!user) {
                throw createError(404, "User not found");
            }

            const overlap = await trx("bookings")
                .where({ room_id: roomId, status: "confirmed" })
                .andWhere("start_date", "<", endDate) 
                .andWhere("end_date", ">", startDate) 
                .first();

            if (overlap) {
                throw createError(409, "Room is not available for selected dates");
            }

            const booking = {
                booking_id: uuidv4(),
                user_id: userId,
                room_id: roomId,
                start_date: startDate,
                end_date: endDate,
                status: "confirmed",
            };

            await trx("bookings").insert(booking);

            return booking;
        });
    }
}


const bookingsRepo = new BookingsRepo();
export default bookingsRepo;