import { config } from "../config";
import connectDB from "../db";
import app from "./app";
import logger from "./core/logger";


export const start = async () => {
  try {
    await connectDB();
    app.listen(config.port, "0.0.0.0", () => {
      logger.info(`REST API running on port : ${config.port}`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

start()