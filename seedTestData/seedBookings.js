import knex from "knex";
import { v4 as uuidv4 } from "uuid";
import { development } from "../knexfile.js";

const db = knex(development);

async function seed(db) {
    await db("bookings").del();

    const users = await db("users").select("user_id").limit(2);
    const rooms = await db("rooms").select("room_id").limit(3);

    if (users.length === 0 || rooms.length === 0) {
        console.log("Please seed users and rooms first!");
        return;
    }

    await db("bookings").insert([
        {
            booking_id: uuidv4(),
            user_id: users[0].user_id,
            room_id: rooms[0].room_id,
            start_date: "2025-09-01",
            end_date: "2025-09-05",
            status: "confirmed",
            created_at: db.fn.now()
        },
        {
            booking_id: uuidv4(),
            user_id: users[0].user_id,
            room_id: rooms[1].room_id,
            start_date: "2025-09-10",
            end_date: "2025-09-12",
            status: "confirmed",
            created_at: db.fn.now()
        },
        {
            booking_id: uuidv4(),
            user_id: users[1]?.user_id || users[0].user_id,
            room_id: rooms[2].room_id,
            start_date: "2025-09-15",
            end_date: "2025-09-18",
            status: "confirmed",
            created_at: db.fn.now()
        }
    ]);

}

seed(db)
    .then(() => console.log("Bookings table has been successfully populated with test data"))
    .catch((e) => console.log(e))
    .finally(() => db.destroy());
