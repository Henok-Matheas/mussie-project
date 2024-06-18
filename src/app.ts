import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { config } from "../config";
import {
    ApiError,
    ErrorType,
    InternalError,
    NotFoundError,
} from "./core/ApiError";
import Logger from "./core/logger";
import flagRouter from "./resources/flag/flag.route";
import notificationRouter from "./resources/notification/notification.route";
import userRouter from "./resources/user/user.route";
const app = express()



process.on("uncaughtException", (e) => {
    Logger.error(e)
})
app.use(express.json({ limit: "10mb" }))
app.use(
    express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
)

app.use(cors())


app.use('/api', flagRouter)
app.use('/api', userRouter)
app.use('/api', notificationRouter)


app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "OK" })
})

app.use((req: Request, res: Response, next: NextFunction) =>
    next(new NotFoundError())
)

app.use((err: Error, req: Request, res: Response) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res)
        if (err.type === ErrorType.INTERNAL)
            Logger.error(
                `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
            )
    } else {
        Logger.error(
            `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        )
        Logger.error(err)
        if (config.environment === "development") {
            return res.status(500).send(err)
        }
        ApiError.handle(new InternalError(), res)
    }
})

export default app