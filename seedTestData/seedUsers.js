import knex from "knex";
import { v4 as uuidv4 } from "uuid";
import { development } from "../knexfile.js";

const db = knex(development);

async function seed(db) {
    await db("users").del();

    await db("users").insert([
        {
            user_id: uuidv4(),
            email: "user1@gmail.com",
            password_hash:
                "$2b$10$cBLYwZZn58aDdHAAShh3DudLwitAsZPvm62kjyR9eG7ya1oEzx3JS",
            name: "User Userov",
        },
        {
            user_id: uuidv4(),
            email: "user2@gmail.com",
            password_hash:
                "$2b$10$iG48r18ekCYZ.Mb1vW7zKOXq9Bqg7Qj0DZiFrKbrBNQOe2HQW3uNW",
            name: "User Userovich",
        },
        {
            user_id: uuidv4(),
            email: "user3@gmail.com",
            password_hash:
                "$2b$10$xgep1seW8rAvThK6.tIGtOgbnk5ssRyPIyrg5RzLZ8UIf2N8rO6eK",
            name: "User Userovsky",
        },
        {
            user_id: uuidv4(),
            email: "user4@gmail.com",
            password_hash:
                "$2b$10$nxoJ9/PGixbIC/AmFONKhuQcF.vUjLxv3JviAmXM3DAvx38geRmWy",
            name: "User Useroff",
        }
    ]);

}

seed(db)
    .then(() => console.log("Users table has been successfully populated with test data"))
    .catch((e) => console.log(e))
    .finally(() => db.destroy());