import { server } from "./infrastructure/config/app";
import { connectDb } from "./infrastructure/config/connectDb";
import dotenv from 'dotenv';

dotenv.config();
connectDb();
server.listen(process.env.PORT, ()=>console.log('server running'))
