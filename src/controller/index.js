import express from "express";
import { errorHandler } from "../errors/errors.js";
import accountsRouter from "../routes/accounts.js";
import { logger, loggerAuth } from "../loggers/logger.js";
import { authenticate } from "../middleware/auth.js";
import roomsRouter from "../routes/rooms.js";
import bookingsRouter from "../routes/bookings.js";
import { userRateLimiter } from "../middleware/rateLimit.js";


const port = process.env.PORT ?? 3600;

const app = express();

app.use(express.json());
app.use(logger);
app.use(loggerAuth);
app.use(authenticate());
app.use(userRateLimiter);
app.use("/api/v1/auth", accountsRouter);
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use((req, res) => res.status(404).send(`path ${req.path} is not found`));
app.use(errorHandler);

app.listen(port, () => console.log(`server is listening on port ${port}`));
