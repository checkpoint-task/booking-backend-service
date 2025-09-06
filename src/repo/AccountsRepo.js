import knex from "knex"
import { development } from "../../knexfile.js";
import { createError } from "../errors/errors.js";
import { v4 as uuidv4 } from "uuid";

class AccountsRepo {
    #db

    constructor() {
        this.#db = new knex(development)
    }

    async getAccountByEmail(email) {
        const resAccount = await this.#db("users").where({ email }).first();
        if (!resAccount) {
            throw createError(404, `user with e-mail ${email} doesn't exist`);
        }
        return resAccount;
    }

    async createNewAccount(account) {
        try {
            const resAccount = {
                user_id: uuidv4(),
                email: account.email,
                password_hash: account.hashPassword,
                name: account.name
            }
            await this.#db("users").insert(resAccount);
            return resAccount;
        } catch (error) {
            throw createError(409, `user with e-mail ${account.email} already exists`);
        }
    }
}

const accountsRepo = new AccountsRepo();
export default accountsRepo;