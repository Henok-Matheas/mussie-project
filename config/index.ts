import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT) || 8000,
  environment: process.env.ENVIRONMENT,
  db: {
    remote: process.env.DATABASE_URI || "",
  },
  openai: process.env.OPENAI_TOKEN || "",
  apiVersion: process.env.API_VERSION || "1",
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET || "",
    expiresIn: process.env.JWT_EXPIRESIN,
  },
};
