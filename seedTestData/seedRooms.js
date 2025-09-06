import knex from "knex";
import { v4 as uuidv4 } from "uuid";
import { development } from "../knexfile.js";

const db = knex(development);

async function seed() {
  await db("rooms").del();

  await db("rooms").insert([
    {
      room_id: uuidv4(),
      name: "Deluxe Suite",
      location: "Moscow",
      price_per_night: 120.5,
      capacity: 2,
    },
    {
      room_id: uuidv4(),
      name: "Family Room",
      location: "Saint Petersburg",
      price_per_night: 90.0,
      capacity: 4,
    },
    {
      room_id: uuidv4(),
      name: "Economy Room",
      location: "Kazan",
      price_per_night: 55.5,
      capacity: 2,
    },
    {
      room_id: uuidv4(),
      name: "Business Suite",
      location: "Novosibirsk",
      price_per_night: 150.0,
      capacity: 3,
    },
    {
      room_id: uuidv4(),
      name: "Penthouse",
      location: "Sochi",
      price_per_night: 300.0,
      capacity: 5,
    },
  ]);
}

seed(db)
  .then(() => console.log("Users table has been successfully populated with test data"))
  .catch((e) => console.log(e))
  .finally(() => db.destroy());


