import { config } from "dotenv";

config({
    path: ".env",
});

export const { PORT, API_KEY, FE_URL } = process.env