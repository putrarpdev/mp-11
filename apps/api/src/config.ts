import { config } from 'dotenv';
import { resolve } from 'path';
import axios from 'axios';
import express from 'express';
import { UserController } from './controllers/user.controller';


export const NODE_ENV = process.env.NODE_ENV || 'development';


const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

const app = express()

app.get("/users",(req,res) => {
    res.send(UserController)
});

// const axiosInstance = axios.create({
//     baseURL: "http://localhost:8000/api",
//     timeout: 1000,
//     headers: { 'Content-Type': 'application/json'},
// })

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
// export default axiosInstance;

app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`)
})