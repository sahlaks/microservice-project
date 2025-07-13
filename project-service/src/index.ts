import dotenv from 'dotenv';
import { connectDb } from './infrastructure/config/connectDb';
import { server } from './infrastructure/config/app';
import { connectProducer } from './infrastructure/kafka/producer';

dotenv.config();
connectDb();

server.listen(process.env.PORT, async () => {
    console.log('Server is running!')
    await connectProducer();
}); 