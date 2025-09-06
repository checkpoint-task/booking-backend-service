import express from "express";
import accountsService from "../service/AccountsService.js";
import asyncHandler from "express-async-handler";
import { valitator } from "../middleware/validation.js";
import { schemaEmailNamePassword } from "../validation/accountsSchemas.js";

const accountsRouter = express.Router();

accountsRouter.post("/register", valitator(schemaEmailNamePassword, "body"), asyncHandler(async (req, res) => {
    await accountsService.addAccount(req.body);
    res.status(201).send("user account added");
}));
accountsRouter.post("/login", asyncHandler(async (req, res) => { 
    res.send(await accountsService.login(req.body.email, req.body.password));
}));

export default accountsRouter;