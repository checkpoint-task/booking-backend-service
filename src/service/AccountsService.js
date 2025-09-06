import { createError } from "../errors/errors.js";
import config from "config";
import bcrypt from "bcrypt";
import JwtUtils from "../security/JwtUtils.js";
import accountsRepo from "../repo/AccountsRepo.js";


class AccountsService {

    async addAccount(account) {
        const serviceAccount = this.#toServiceAccount(account);
        const resAccount = await accountsRepo.createNewAccount(serviceAccount);
        return {
            userId: resAccount.user_id,
            name: resAccount.name,
            hashPassword: resAccount.password_hash,
            email: resAccount.email,
        };
    }

    async getAccount(email) {
        const resAccount = await accountsRepo.getAccountByEmail(email);
        return {
            email: resAccount.email,
            hashPassword: resAccount.password_hash,
            userId: resAccount.user_id,
        };
    }

    async login(email, password) {
        const serviceAccount = await this.getAccount(email);
        if (!serviceAccount || ! await bcrypt.compare(password, serviceAccount.hashPassword)) {
            throw createError(400, "wrong credential");
        }
        return JwtUtils.getJwt(serviceAccount);
    }

    #toServiceAccount(account) {
        const hashPassword = bcrypt.hashSync(account.password, config.get("accounting.salt_rounds"));
        const serviceAccount = {
            email: account.email,
            name: account.name,
            hashPassword,
        };
        return serviceAccount;
    }
}



const accountsService = new AccountsService();
export default accountsService;