import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import likeRouter from '../../presentation/routes/likeRoutes';
import { errorHandler } from '../../presentation/middleware/errorHandler';

const app = express();

app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/like', likeRouter);
app.use(errorHandler);

export const server = http.createServer(app)