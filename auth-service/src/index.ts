import { server } from "./infrastructure/config/app";
import dotenv from 'dotenv';
import { connectDb } from "./infrastructure/config/connectDb";

dotenv.config();
connectDb();
server.listen(process.env.PORT,()=>console.log("Server connected successfully!!"))


