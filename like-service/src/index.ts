import { server } from "./infrastructure/config/app";
import { connectDb } from "./infrastructure/config/connectDb";
import dotenv from 'dotenv';
import { startConsumer } from "./infrastructure/kafka/consumer";

dotenv.config();
connectDb();
server.listen(process.env.PORT, async ()=>{
    console.log('server running')
    await startConsumer(); 
});
