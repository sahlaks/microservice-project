import dotenv from 'dotenv';
import { connectDb } from './infrastructure/config/connectDb';
import { server } from './infrastructure/config/app';

dotenv.config();
connectDb();
server.listen(process.env.PORT, () => console.log('Server is running!'));