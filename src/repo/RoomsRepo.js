import knex from "knex"
import { development } from "../../knexfile.js";

class RoomsRepo {
    #db

    constructor() {
        this.#db = new knex(development)
    }

    async getRoomsByFilter(filter) {
        const {
            location,
            guests,
            startDate,
            endDate,
            page = 1,
            limit = 10
        } = filter;

        let query = this.#db("rooms").select("*").where("capacity", ">=", guests);

        if (location) {
            query.andWhereRaw("lower(location) like ?", [`%${location.toLowerCase()}%`]);
        }

        query.whereNotExists(function () {
            this.select("*")
                .from("bookings")
                .whereRaw('"bookings"."room_id" = "rooms"."room_id"')
                .andWhere("bookings.status", "confirmed")
                .andWhere(function () {
                    this.where("bookings.start_date", "<", endDate)
                    .andWhere("bookings.end_date", ">", startDate);
                });
        });

        const offset = (page - 1) * limit;

        let res = await query;
        const total = res.length;
        res = await query.limit(limit).offset(offset);
        return {
            results: res,
            pagination: {
                page,
                limit,
                total
            }
        };
    }
}

const roomsRepo = new RoomsRepo();
export default roomsRepo;